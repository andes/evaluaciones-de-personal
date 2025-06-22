import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PlanillaEDService } from '../services/PlanillaED.Service';
import { PlanillaEDCabeceraService } from '../services/PlanillaEDCabecera.service';
import { AgentesService } from '../services/agentes.service';
import { PlanillaEDDetalleService } from '../services/PlanillaEDDetalle.service';


const Swal = require('sweetalert2').default;

@Component({
    selector: 'app-evaluacion-cabecera',
    templateUrl: './evaluacionCabecera.component.html',
    styleUrls: ['./evaluacionCabecera.component.css']
})
export class EvaluacionCabeceraComponent implements OnInit {
    evaluacionCabecera: any = {};

    nombreAgenteEvaluador: string = '';
    efectorNombre: string = '';
    servicioNombre: string = '';
    idGuardado: string | null = null;
    tipoBusqueda: string = 'nombre';

    get textoBusqueda(): string {
        return this.tipoBusqueda === 'nombre' ? 'Buscar por Nombre' : 'Buscar por Legajo';
    }

    agentesDisponibles: any[] = [];
    filtroAgente: string = '';
    categoriasDesdePlanilla: any[] = [];

    mostrarModal: boolean = false;
    isLoading: boolean = true; // Para manejar el estado de carga

    constructor(
        private authService: AuthService,
        private planillaService: PlanillaEDService,
        private planillaEDCabeceraService: PlanillaEDCabeceraService,
        private agentesService: AgentesService,
        private evaluacionDetalleService: PlanillaEDDetalleService,
    ) { }

    ngOnInit(): void {
        this.obtenerAgentesDisponibles();
        this.nombreAgenteEvaluador = this.authService.getNombre();

        const efectorId = this.authService.getEfector();
        const servicioId = this.authService.getServicio();

        this.evaluacionCabecera = {
            periodo: '',
            agenteevaluador: {
                idUsuarioEvaluador: this.authService.getId(),
                nombreUsuarioEvaluador: this.nombreAgenteEvaluador
            },
            Efector: { idEfector: efectorId },
            Servicio: { idServicio: servicioId },
            usuario: this.authService.getNombre(),
            fechaMod: new Date().toISOString()
        };
        //obtener planilla correspondiente al efector y servicio
        console.log('🔍 Buscando planilla con:', { efectorId, servicioId });
        this.planillaService.getPlanillaPorEfectorYServicio(efectorId, servicioId).subscribe({
            next: (data) => {
                if (data && data._id) {
                    console.log('✅ Planilla encontrada:', data);
                    console.log('📂 Categorías de la planilla:', data.categorias);
                    this.categoriasDesdePlanilla = data.categorias || [];
                } else {
                    console.warn('⚠️ La respuesta no contiene una planilla válida:', data);
                }
            },
            error: (err) => {
                if (err.status === 404) {
                    console.warn(`🔍 No se encontró ninguna planilla para:
                     idEfector: ${efectorId}
                    ➤ idServicio: ${servicioId}`);
                } else {
                    console.error('❌ Error al obtener la planilla:', err);
                }
            }
        });

        // Obtener nombre del efector
        this.planillaService.obtenerEfectorPorIdE(efectorId).subscribe({
            next: (data) => {
                this.efectorNombre = data.descripcion || data.nombre || 'Nombre no disponible';
                this.evaluacionCabecera.Efector.nombre = this.efectorNombre;
            },
            error: (err) => {
                console.error('Error al obtener el efector:', err);
                this.efectorNombre = 'Error al cargar efector';
            }
        });

        // Obtener nombre del servicio
        this.planillaService.obtenerServicioPorIdE(servicioId).subscribe({
            next: (data) => {
                this.servicioNombre = data.descripcion || data.nombre || 'Nombre no disponible';
                this.evaluacionCabecera.Servicio.nombre = this.servicioNombre;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error al obtener el servicio:', err);
                this.servicioNombre = 'Error al cargar servicio';
                this.isLoading = false;
            }
        });
    }

    obtenerAgentesDisponibles() {
        this.agentesService.obtenerTodosAgentes().subscribe({
            next: (agentes) => {
                this.agentesDisponibles = agentes;
            },
            error: (err) => {
                console.error('Error al obtener agentes:', err);
                this.agentesDisponibles = [];
            }
        });
    }

    isLoadingAgentes: boolean = false;
    guardarCabecera(): void {
        if (!this.evaluacionCabecera.periodo) {
            Swal.fire({
                icon: 'warning',
                title: 'Periodo requerido',
                text: 'Debes ingresar el período de evaluación antes de guardar.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        this.planillaEDCabeceraService.crearCabeceraEvaluacion(this.evaluacionCabecera).subscribe({
            next: (respuesta) => {
                this.idGuardado = (respuesta.data && respuesta.data._id) || (respuesta.data && respuesta.data.id) || 'Sin ID';
                this.mostrarModal = true;
                this.obtenerAgentesDisponibles();

                Swal.fire({
                    icon: 'success',
                    title: 'Registro guardado',
                    text: 'La cabecera fue guardada exitosamente.',
                    confirmButtonText: 'Aceptar'
                });
            },
            error: (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar',
                    text: 'Hubo un problema al guardar la cabecera. Verificá los datos.',
                    confirmButtonText: 'Cerrar'
                });
            }
        });
    }

    get agentesFiltrados() {
        const filtro = this.filtroAgente.toLowerCase();
        if (!filtro) return this.agentesDisponibles;

        return this.agentesDisponibles.filter(agente => {
            if (this.tipoBusqueda === 'nombre') {
                return agente.nombre.toLowerCase().includes(filtro);
            } else if (this.tipoBusqueda === 'legajo') {
                return agente.legajo.toString().toLowerCase().includes(filtro);
            }
            return false;
        });
    }

    evaluarAgente(agente: any): void {
        // Transformamos las categorías de la planilla a la estructura esperada
        const categoriasTransformadas = this.categoriasDesdePlanilla.map(cat => ({
            idCategoria: cat.categoria._id,
            descripcionCategoria: cat.categoria.descripcion,
            items: cat.items.map(item => ({
                idItem: item._id,  // Puede ser falso por ahora
                descripcion: item.descripcion,
                puntaje: 0
            }))
        }));

        const detalleEvaluacion = {
            _id: this.generateFakeObjectId(),
            idPlanillaEvaluacionCabecera: this.idGuardado,
            agenteEvaluado: {
                idAgenteEvaluado: agente._id,
                nombreAgenteEvaluado: agente.nombre
            },
            categorias: categoriasTransformadas
        };

        console.log('Detalle a enviar:\n', JSON.stringify(detalleEvaluacion, null, 2));

        // 💾 Primero guardamos la evaluación
        this.evaluacionDetalleService.crearEvaluacionDetalle(detalleEvaluacion).subscribe({
            next: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Evaluación guardada',
                    text: `Evaluación de ${agente.nombre} registrada.`,
                    confirmButtonText: 'Aceptar'
                });

                // ✅ Luego corregimos los IDs falsos por los reales
                this.evaluacionDetalleService
                    .corregirItemsPorDescripcion(detalleEvaluacion._id)
                    .subscribe({
                        next: () => {
                            console.log('✅ Corrección de IDs de ítems realizada con éxito');
                        },
                        error: (err) => {
                            console.error('❌ Error al corregir los IDs de ítems:', err);
                        }
                    });
            },
            error: (err) => {
                console.error('Error al guardar evaluación:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar la evaluación.',
                    confirmButtonText: 'Cerrar'
                });
            }
        });
    }

    // ✅ Este método debe estar fuera de `evaluarAgente`, dentro de la clase
    generateFakeObjectId(): string {
        const hex = '0123456789abcdef';
        let objectId = '';
        for (let i = 0; i < 24; i++) {
            objectId += hex[Math.floor(Math.random() * 16)];
        }
        return objectId;
    }
}