//import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { PlanillaEDCabeceraService, PlanillaEDCabecera } from '../services/PlanillaEDCabecera.service';
import { AgentesService } from '../services/agentes.service';
import { PlanillaEDDetalleService } from '../services/PlanillaEDDetalle.service';
import { TipoEvaluacionService, TipoEvaluacion } from '../services/tipoevaluacion.service';
const Swal = require('sweetalert2').default;
import { Router } from '@angular/router';
import { PlanillaEDService } from '../services/PlanillaED.Service';


import { AuthService } from '../auth.service';


@Component({
    selector: 'app-evaluacion-cabecera',
    templateUrl: './evaluacionAgente.component.html',
    styleUrls: ['./evaluacionAgente.component.css']
})
export class EvaluacionAgenteComponent implements OnInit {

    idCabecera: string = '';


    tiposEvaluacion: TipoEvaluacion[] = [];
    idTipoEvaluacion: string = '';
    cabecera: PlanillaEDCabecera | null = null;
    agentesDisponibles: any[] = [];
    tipoBusqueda: string = 'nombre';
    categoriasDesdePlanilla: any[] = [];
    idGuardado: string = '';
    filtroAgente: string = '';
    agentesYaEvaluados: any[] = [];
    agenteSeleccionado: any = null;

    get agentesFiltrados() {
        const filtro = this.filtroAgente.toLowerCase();
        return this.agentesDisponibles.filter(agente =>
            agente.nombre.toLowerCase().includes(filtro)
        );
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private planillaCabeceraService: PlanillaEDCabeceraService,
        private agentesService: AgentesService,
        private planillaEDDetalleService: PlanillaEDDetalleService,
        private evaluacionDetalleService: PlanillaEDDetalleService,
        private _tipoEvaluacionService: TipoEvaluacionService,
        private planillaService: PlanillaEDService,
    ) { }


    ngOnInit(): void {
        this.cargarTiposEvaluacion();
        // this.cargarTiposEvaluacion(); // Removed this line
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.idCabecera = id;
                console.log('📌 ID recibido desde ruta:', id);
                this.obtenerCabeceraConMeta(id);
                this.cargarAgentesEvaluados(id);  // ← ¡ACÁ SE LLAMA!
            }
        });

        this.obtenerAgentesDisponibles();


        const agente = this.agenteSeleccionado; // Example of how to define 'agente'
        this.evaluacionDetalleService.existeEvaluacion(this.idCabecera, agente._id)


    }
    cargarTiposEvaluacion() {
        this._tipoEvaluacionService.obtenerTipos().subscribe((data: TipoEvaluacion[]) => {
            this.tiposEvaluacion = data;
        });
    }


    obtenerCabeceraConMeta(id: string): void {
        this.planillaCabeceraService.obtenerCabeceraG(id).subscribe({
            next: (respuesta) => {
                console.log('🌐 Respuesta completa:', respuesta);
                this.cabecera = respuesta.data;
                console.log('🧾 Cabecera recibida:', this.cabecera);
            },
            error: (error) => {
                console.error('❌ Error al obtener la cabecera:', error);
            }
        });
    }

    obtenerAgentesDisponibles(): void {
        this.agentesService.obtenerTodosAgentes().subscribe({
            next: (agentes) => {
                this.agentesDisponibles = agentes;
                console.log('📋 Agentes cargados:', this.agentesDisponibles);
            },
            error: (err) => {
                console.error('❌ Error al obtener agentes:', err);
                this.agentesDisponibles = [];
            }
        });
    }

    cargarAgentesEvaluados(idCabecera: string): void {
        this.planillaEDDetalleService.obtenerAgentesEvaluadosPorCabecera(idCabecera).subscribe({
            next: (resp) => {
                if (resp.success) {
                    this.agentesYaEvaluados = resp.data;
                    console.log('✅ Agentes evaluados:', this.agentesYaEvaluados);
                }
            },
            error: (err) => {
                console.error('❌ Error al cargar agentes evaluados:', err);
            }
        });
    }
    evaluarAgente(agente: any): void {
        console.log('🟢 Evaluar agente:', agente);

        if (!this.idTipoEvaluacion) {
            Swal.fire({
                icon: 'warning',
                title: 'Tipo de evaluación requerido',
                text: 'Seleccioná un tipo de evaluación antes de continuar.',
            });
            return;
        }

        this.planillaService.getPlanillaPorTipoEvaluacion(this.idTipoEvaluacion).subscribe({
            next: (planilla) => {
                if (!planilla || !planilla._id) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se encontró una planilla válida.',
                    });
                    return;
                }

                this.categoriasDesdePlanilla = planilla.categorias || [];

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
                    idPlanillaEvaluacionCabecera: this.idCabecera,
                    agenteEvaluado: {
                        idAgenteEvaluado: agente._id,
                        nombreAgenteEvaluado: agente.nombre
                    },
                    categorias: categoriasTransformadas
                };

                this.evaluacionDetalleService.existeEvaluacion(this.idCabecera, agente._id)
                    .subscribe({
                        next: (respuesta) => {
                            if (respuesta.existe) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Agente ya evaluado',
                                    text: `El agente ${agente.legajo} ${agente.nombre} ya fue evaluado.`,
                                });
                            } else {
                                this.evaluacionDetalleService.crearEvaluacionDetalle(detalleEvaluacion).subscribe({
                                    next: () => {
                                        this.evaluacionDetalleService.corregirItemsPorDescripcion(detalleEvaluacion._id).subscribe({
                                            next: () => {
                                                this.cargarAgentesEvaluados(this.idCabecera);

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
                                                        this.agenteSeleccionado = null;
                                                    }
                                                });
                                            },
                                            error: (err) => {
                                                console.error('❌ Error al corregir ítems:', err);
                                                Swal.fire('Error', 'No se pudo corregir los ítems.', 'error');
                                            }
                                        });
                                    },
                                    error: (err) => {
                                        console.error('❌ Error al guardar evaluación:', err);
                                        Swal.fire('Error', 'No se pudo guardar la evaluación.', 'error');
                                    }
                                });
                            }
                        },
                        error: (err) => {
                            console.error('❌ Error al verificar existencia:', err);
                            Swal.fire('Error', 'No se pudo verificar la evaluación existente.', 'error');
                        }
                    });

            },
            error: (err) => {
                console.error('❌ Error al obtener planilla:', err);
                Swal.fire('Error', 'No se pudo obtener la planilla.', 'error');
            }
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
    //navega a la página de evaluación de ítems
    verItemsEvaluacion(agente: any): void {
        console.log('Objeto agente recibido:', agente);
        const idAgente = agente.idAgenteEvaluado || agente._id;
        const idEvaluacion = this.idCabecera;

        // Intentar obtener el nombre con varias propiedades comunes
        const nombreAgente = agente.nombre
            || agente.nombreAgenteEvaluado
            || agente.nombreUsuarioEvaluado
            || agente.legajo
            || 'Nombre no disponible';

        console.log('Nombre agente a enviar:', nombreAgente);

        if (idAgente && idEvaluacion) {
            this.router.navigate(
                ['/evaluacion-items', idEvaluacion, idAgente],
                { queryParams: { nombreAgente: nombreAgente } }
            );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Datos faltantes',
                text: 'No se pudo redireccionar porque faltan datos.',
                confirmButtonText: 'Cerrar'
            });
        }
    }
}


