import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PlanillaEDService } from '../services/PlanillaED.Service';
import { PlanillaEDCabeceraService } from '../services/PlanillaEDCabecera.service';
import { AgentesService } from '../services/agentes.service';
import { PlanillaEDDetalleService } from '../services/PlanillaEDDetalle.service';
import { TipoEvaluacionService, TipoEvaluacion } from '../services/tipoevaluacion.service';
const Swal = require('sweetalert2').default;

@Component({
    selector: 'app-evaluacion-cabecera',
    templateUrl: './evaluacionCabecera.component.html',
    styleUrls: ['./evaluacionCabecera.component.css']
})
export class EvaluacionCabeceraComponent implements OnInit {
    tiposEvaluacion: TipoEvaluacion[] = [];
    evaluacionCabecera: any = {};
    cabeceraSeleccionada: any = null;
    idTipoEvaluacion: string = '';

    nombreAgenteEvaluador: string = '';
    efectorNombre: string = '';
    servicioNombre: string = '';
    idGuardado: string | null = null;
    tipoBusqueda: string = 'nombre';
    cabecerasEncontradas: any[] = [];

    get textoBusqueda(): string {
        return this.tipoBusqueda === 'nombre' ? 'Buscar por Nombre' : 'Buscar por Legajo';
    }
    evaluacion: any = {};

    agentesDisponibles: any[] = [];
    filtroAgente: string = '';
    categoriasDesdePlanilla: any[] = [];

    mostrarModal: boolean = false;
    isLoading: boolean = true;

    constructor(
        private authService: AuthService,
        private planillaService: PlanillaEDService,
        private planillaEDCabeceraService: PlanillaEDCabeceraService,
        private agentesService: AgentesService,
        private evaluacionDetalleService: PlanillaEDDetalleService,
        private _tipoEvaluacionService: TipoEvaluacionService,
    ) { }

    ngOnInit(): void {
        this.obtenerAgentesDisponibles();
        this.cargarTiposEvaluacion();
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

        // Obtener planilla correspondiente al efector y servicio
        console.log('🔍 Buscando planilla con:', { efectorId, servicioId });






        ///////////  este metodo debo reemplazar para buscar planilla por tipo de planila
        /*     this.planillaService.getPlanillaPorTipoEvaluacion(idTipoEvaluacion).subscribe({
                 next: (data) => {
                     if (data && data._id) {
                         console.log('✅ Planilla encontrada por tipoEvaluacion:', data);
                         console.log('📂 Categorías de la planilla:', data.categorias);
                         this.categoriasDesdePlanilla = data.categorias || [];
                     } else {
                         console.warn('⚠️ La respuesta no contiene una planilla válida:', data);
                     }
                 },
                 error: (err) => {
                     if (err.status === 404) {
                         console.warn(`🔍 No se encontró ninguna planilla para:
                     ➤ idTipoEvaluacion: ${idTipoEvaluacion}`);
                     } else {
                         console.error('❌ Error al obtener la planilla:', err);
                     }
                 }
             });
             */

        ///////////  este metodo debo reemplazar para buscar planilla por tipo de planila


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
        // cargar grilla de cabeceras
        this.buscarCabeceras();
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

        //  verific si existe la cabecera
        this.planillaEDCabeceraService.verificarExistenciaCabecera(this.evaluacionCabecera).subscribe({
            next: (respuesta) => {
                if (respuesta.existe) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Evaluacion existente',
                        text: 'Ya existe una evaluacion con ese periodo, agente evaluador, efector y servicio.',
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    // No existe, evaluacion nueva
                    this.planillaEDCabeceraService.crearCabeceraEvaluacion(this.evaluacionCabecera).subscribe({
                        next: (respuestaCreacion) => {
                            this.idGuardado = (respuestaCreacion.data && respuestaCreacion.data._id) || (respuestaCreacion.data && respuestaCreacion.data.id) || 'Sin ID';
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
            },
            error: (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de verificación',
                    text: 'No se pudo verificar si la cabecera ya existe.',
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
        // Transformar las categorías
        const categoriasTransformadas = this.categoriasDesdePlanilla.map(cat => ({
            idCategoria: cat.categoria._id,
            descripcionCategoria: cat.categoria.descripcion,
            items: cat.items.map(item => ({
                idItem: item._id,
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

        // verificarsi ya existe esta evaluación para evitar duplicados
        this.evaluacionDetalleService.existeEvaluacion(this.idGuardado!, agente._id).subscribe({
            next: (respuesta) => {
                if (respuesta.existe) {
                    // Si ya existe, alerta y no guardar
                    Swal.fire({
                        icon: 'warning',
                        title: 'Agente ya evaluado',
                        text: `El agente ${agente.legajo} ${agente.nombre} ya fue evaluado en esta planilla.`,
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    // Si no existe, guardar
                    this.evaluacionDetalleService.crearEvaluacionDetalle(detalleEvaluacion).subscribe({
                        next: () => {
                            this.evaluacionDetalleService
                                .corregirItemsPorDescripcion(detalleEvaluacion._id)
                                .subscribe({
                                    next: () => {
                                        console.log('✅ Corrección de IDs de ítems realizada con éxito');

                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Evaluación guardada',
                                            text: `Se agregó el agente: ${agente.legajo} ${agente.nombre}`,
                                            showCancelButton: true,
                                            confirmButtonText: 'Sí, agregar otro',
                                            cancelButtonText: 'No, continuar',
                                        }).then((result: any) => {
                                            if (result.isConfirmed) {
                                                this.obtenerAgentesDisponibles();
                                            } else {
                                                // ir a evaluar agente
                                            }
                                        });
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
            },
            error: (err) => {
                console.error('Error al verificar existencia:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo verificar la evaluación existente.',
                    confirmButtonText: 'Cerrar'
                });
            }
        });
    }
    cargarPlanillaPorTipoEvaluacion(): void {
        console.log('🟡 Se disparó cargarPlanillaPorTipoEvaluacion()');
        console.log('📥 idTipoEvaluacion actual:', this.idTipoEvaluacion);

        if (!this.idTipoEvaluacion) {
            console.warn('⚠️ No se seleccionó un tipo de evaluación válido');
            return;
        }

        this.planillaService.getPlanillaPorTipoEvaluacion(this.idTipoEvaluacion).subscribe({
            next: (data) => {
                console.log('✅ Respuesta recibida desde el backend:', data);

                if (data && data._id) {
                    console.log('📦 Planilla válida encontrada:', data._id);
                    this.categoriasDesdePlanilla = data.categorias || [];
                    console.log('📂 Categorías cargadas:', this.categoriasDesdePlanilla);
                } else {
                    console.warn('⚠️ La respuesta no contiene una planilla válida:', data);
                }
            },
            error: (err) => {
                console.error('❌ Error en la petición HTTP:', err);
            }
        });
    }

    //select tipo evaluacion
    cargarTiposEvaluacion() {
        this._tipoEvaluacionService.obtenerTipos().subscribe((data: TipoEvaluacion[]) => {
            this.tiposEvaluacion = data;
        });
    }


    generateFakeObjectId(): string {
        const hex = '0123456789abcdef';
        let objectId = '';
        for (let i = 0; i < 24; i++) {
            objectId += hex[Math.floor(Math.random() * 16)];
        }
        return objectId;
    }

    //grilla evaluacionnes por usuario, efector y servicio
    buscarCabeceras(): void {
        const idUsuarioEvaluador = this.authService.getId();
        const idEfector = this.authService.getEfector();
        const idServicio = this.authService.getServicio();

        this.planillaEDCabeceraService
            .buscarCabecerasPorEvaluadorEfectorServicio(idUsuarioEvaluador, idEfector, idServicio)
            .subscribe({
                next: (data) => {
                    console.log('📄 Cabeceras encontradas:', data);
                    this.cabecerasEncontradas = data.data || [];  // ✅ corregido
                },
                error: (err) => {
                    console.error('❌ Error al buscar cabeceras:', err);
                    this.cabecerasEncontradas = [];
                }
            });
    }

}
