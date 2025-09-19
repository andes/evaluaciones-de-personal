
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { PlanillaEDCabeceraService, PlanillaEDCabecera } from '../services/PlanillaEDCabecera.service';
import { AgentesService } from '../services/agentes.service';
import { PlanillaEDDetalleService } from '../services/PlanillaEDDetalle.service';
import { TipoEvaluacionService, TipoEvaluacion } from '../services/tipoevaluacion.service';
const Swal = require('sweetalert2').default;
import { Router } from '@angular/router';
import { PlanillaEDService } from '../services/PlanillaED.Service';
import { TipoCierreEvaluacionService, TipoCierreEvaluacion } from '../services/TipoCierreEvaluacionService';
import { EvaluacionService, EvaluacionCompleta } from '../services/PlanillaEDListados.service';
import { EvaluacionResultadosService, ApiResponse } from '../services/evaluacionResulado.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



import { AuthService } from '../auth.service';


@Component({
    selector: 'app-evaluacion-cabecera',
    templateUrl: './evaluacionAgente.component.html',
    styleUrls: ['./evaluacionAgente.component.css']
})
export class EvaluacionAgenteComponent implements OnInit {

    idCabecera: string = '';
    idAgente: string = '';


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
    mostrarModalCerrar: boolean = false;
    motivoSeleccionado: any = null;
    motivosCierre: any[] = []; // Llenar desde el servicio
    fechaCierre: string = '';
    idCabeceraEvaluacion: string = '';
    nombreAgenteCerrar: string = '';
    totalItemsConValor: number = 0;
    promedioPuntaje: number = 0;

    idEvaluacionDetalle!: string;
    idAgenteCerrar!: string;



    totales: {
        totalItems?: number;
        itemsConValor?: number;
        sumaPuntajes?: number;
        promedio?: number;
    } = {};

    sumaPuntajes: number = 0;
    totalesPuntajes: number = 0;
    totalesItems: number = 0;


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
        private tipoCierreEvaluacionService: TipoCierreEvaluacionService,
        private evaluacionService: EvaluacionService,
        private evaluacionResultadosService: EvaluacionResultadosService,

    ) { }


    ngOnInit(): void {

        this.cargarTotales('idCabeceraEjemplo', 'idAgenteEjemplo')
            .then(() => console.log('Totales cargados'))
            .catch(err => console.error(err));

        this.cargarTiposEvaluacion();


        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.idCabecera = id;

                this.obtenerCabeceraConMeta(id);
                this.cargarAgentesEvaluados(id);
            }
        });

        this.obtenerAgentesDisponibles();


        const agente = this.agenteSeleccionado;
        this.evaluacionDetalleService.existeEvaluacion(this.idCabecera, agente._id)

        this.route.paramMap.subscribe(params => {
            const id = params.get('id'); // 🔹 aquí se obtiene el id de la ruta
            if (id) {
                this.idCabecera = id;

                this.obtenerCabeceraConMeta(id);
                this.cargarAgentesEvaluados(id);
                this.cargarTotales(this.idCabecera, this.idAgente);

            }
        });
    }


    cargarTiposEvaluacion() {
        this._tipoEvaluacionService.obtenerTipos().subscribe((data: TipoEvaluacion[]) => {
            this.tiposEvaluacion = data;
        });
    }


    obtenerCabeceraConMeta(id: string): void {
        this.planillaCabeceraService.obtenerCabeceraG(id).subscribe({
            next: (respuesta) => {

                this.cabecera = respuesta.data;

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

                }
            },
            error: (err) => {
                console.error('❌ Error al cargar agentes evaluados:', err);
            }
        });
    }
    evaluarAgente(agente: any): void {


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
                        title: 'Planilla no encontrada',
                        text: 'No se encontró una planilla válida para el tipo de evaluación seleccionado. Por favor, elegí un tipo existente.',
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
                                // Crear la evaluación
                                this.evaluacionDetalleService.crearEvaluacionDetalle(detalleEvaluacion).subscribe({
                                    next: () => {
                                        // Corregir ítems por descripción
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

                                                Swal.fire('Error', 'No se pudo corregir los ítems.', 'error');
                                            }
                                        });
                                    },
                                    error: (err) => {

                                        Swal.fire('Error', 'No se pudo guardar la evaluación.', 'error');
                                    }
                                });
                            }
                        },
                        error: (err) => {

                            Swal.fire('Error', 'No se pudo verificar la evaluación existente.', 'error');
                        }
                    });
            },
            error: (err) => {

                Swal.fire('Error', 'Ocurrió un error al obtener la planilla.', 'error');
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

        const idAgente = agente.idAgenteEvaluado || agente._id;
        const idEvaluacion = this.idCabecera;

        // Intentar obtener el nombre con varias propiedades comunes
        const nombreAgente = agente.nombre
            || agente.nombreAgenteEvaluado
            || agente.nombreUsuarioEvaluado
            || agente.legajo
            || 'Nombre no disponible';



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

    abrirModalCerrar(idEvaluacionDetalle: string, idAgente: string, nombreAgente: string) {

        this.idEvaluacionDetalle = idEvaluacionDetalle; // para cerrarEvaluacion()
        this.idAgenteCerrar = idAgente;                // para cerrarEvaluacion()
        this.nombreAgenteCerrar = nombreAgente;        // solo para mostrar en el modal
        this.fechaCierre = this.obtenerFechaHoy();
        this.mostrarModalCerrar = true;

        this.tipoCierreEvaluacionService.obtenerTodos().subscribe({
            next: (motivos: TipoCierreEvaluacion[]) => {
                this.motivosCierre = motivos.map(motivo => ({
                    id: (motivo as any).id || (motivo as any)._id,
                    nombre: motivo.nombre
                }));

            },
            error: (err) => console.error('❌ Error al obtener motivos:', err)
        });
    }


    confirmarCierre() {
        if (!this.idEvaluacionDetalle || !this.idAgenteCerrar) {
            console.error('⚠️ Faltan datos para cerrar evaluación:', this.idEvaluacionDetalle, this.idAgenteCerrar);
            return;
        }

        if (!this.motivoSeleccionado) {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'Debe seleccionar un tipo de cierre antes de continuar.'
            });
            return;
        }

        const tipoCierre = {
            idTipoCierreEvaluacion: this.motivoSeleccionado._id,
            nombreTipoCierreEvaluacion: this.motivoSeleccionado.nombre,
            detalle: this.motivoSeleccionado.detalle || '',
            descripcion: this.motivoSeleccionado.descripcion || ''
        };



        this.planillaEDDetalleService.cerrarEvaluacion(
            this.idEvaluacionDetalle,
            this.idAgenteCerrar,
            tipoCierre
        ).subscribe({
            next: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Evaluación cerrada correctamente'
                });

                this.mostrarModalCerrar = false;

                // 🔄 Refrescar grilla inmediatamente
                this.cargarAgentesEvaluados(this.idCabecera);
            },
            error: (err) => {
                console.error('❌ Error al cerrar evaluación:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo cerrar la evaluación. Intente nuevamente.'
                });
            }
        });
    }

    obtenerFechaHoy(): string {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }



    seleccionarAgente(agente: any) {
        this.agenteSeleccionado = agente;

        if (agente && (agente._id || agente.idAgenteEvaluado)) {
            const idAgente = agente.idAgenteEvaluado || agente._id;

            this.cargarTotales(this.idCabecera, idAgente)

                .catch((err) => console.error('Error al cargar totales:', err));
        }
    }
    cargarTotales(idCabecera: string, idAgente: string): Promise<void> {
        return new Promise((resolve, reject) => {


            this.evaluacionResultadosService.obtenerTotales(idCabecera, idAgente).subscribe({
                next: (resp) => {


                    const totalItems = resp && resp.totalItems ? resp.totalItems : 0;
                    const sumaPuntajes = resp && resp.totalPuntaje ? resp.totalPuntaje : 0;

                    this.totalItemsConValor = totalItems;
                    this.sumaPuntajes = sumaPuntajes;
                    this.promedioPuntaje = totalItems > 0 ? sumaPuntajes / totalItems : 0;


                    resolve();
                },
                error: (err) => {
                    console.error('❌ Error en obtenerTotales:', err);
                    reject(err);
                }
            });
        });
    }






    imprimirEvaluacion(agente: any): void {
        const idAgente = agente.idAgenteEvaluado;
        const idCabecera = this.idCabecera;

        if (!idCabecera || !idAgente) {
            Swal.fire('Error', 'Faltan datos para generar el PDF', 'error');
            return;
        }

        const parseToDate = (input: any): string => {
            if (!input) return '-';
            let d: Date;
            if (input instanceof Date) d = input;
            else if (typeof input === 'string' || typeof input === 'number') d = new Date(input);
            else if (input.$date) d = new Date(input.$date);
            else return '-';
            return isNaN(d.getTime()) ? '-' : d.toLocaleDateString();
        };

        this.cargarTotales(idCabecera, idAgente).then(() => {
            const totalItems = this.totalItemsConValor;
            const sumaPuntajes = this.sumaPuntajes;
            const promedio = this.promedioPuntaje;

            this.evaluacionService.obtenerEvaluacionCompleta(idCabecera).subscribe(
                (resp) => {
                    if (!resp || !resp.detalles) {
                        Swal.fire('Error', 'No se encontraron detalles para la evaluación', 'error');
                        return;
                    }

                    const detalleAgente = resp.detalles.find(
                        d => d.agenteEvaluado.idAgenteEvaluado === idAgente
                    );

                    if (!detalleAgente) {
                        Swal.fire('Error', 'No se encontró la evaluación de este agente', 'error');
                        return;
                    }

                    const doc = new jsPDF();
                    doc.setFontSize(18);
                    doc.setFont("helvetica", "bold");
                    doc.text("Evaluación de Desempeño", 105, 15, { align: "center" });

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "normal");
                    doc.text(`Legajo: ${detalleAgente.agenteEvaluado.legajo || '-'}`, 10, 30);
                    doc.text(`Nombre: ${detalleAgente.agenteEvaluado.nombreAgenteEvaluado.toUpperCase()}`, 10, 38);

                    doc.text(`Efector: ${resp.cabecera.Efector.nombre}`, 10, 50);
                    doc.text(`Servicio: ${resp.cabecera.Servicio.nombre}`, 10, 58);
                    doc.text(`Período: ${parseToDate(resp.cabecera.periodo)}`, 10, 66);

                    const bodyRows: any[] = [];
                    detalleAgente.categorias.forEach((cat: any) => {
                        bodyRows.push([{
                            content: cat.descripcionCategoria,
                            colSpan: 2,
                            styles: { halign: 'left', fontStyle: 'bold', fillColor: [144, 238, 144] }
                        }]);
                        cat.items.forEach((item: any) => {
                            bodyRows.push([item.descripcion, item.puntaje]);
                        });
                    });

                    autoTable(doc, {
                        body: bodyRows,
                        startY: 75,
                        theme: 'grid',
                        styles: { fontSize: 11 },
                        columnStyles: {
                            0: { cellWidth: 150 },
                            1: { cellWidth: 40, halign: 'center' }
                        }
                    });

                    let finalY = 75;
                    if ((doc as any).lastAutoTable) {
                        finalY = (doc as any).lastAutoTable.finalY;
                    }

                    doc.setDrawColor(0);
                    doc.setFillColor(240, 240, 240);
                    doc.rect(10, finalY + 10, 190, 35, 'FD');

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.text(`Total de ítems con valor: ${totalItems}`, 15, finalY + 18);
                    doc.text(`Suma de puntajes: ${sumaPuntajes}`, 15, finalY + 25);
                    doc.text(`Promedio de puntaje: ${promedio.toFixed(2)}`, 15, finalY + 32);

                    const tipoCierre = (agente.tipoCierreEvaluacion && agente.tipoCierreEvaluacion.nombreTipoCierreEvaluacion)
                        ? agente.tipoCierreEvaluacion.nombreTipoCierreEvaluacion
                        : '-';

                    const fechaCierreTexto = parseToDate(resp.cabecera.fechaCierre);

                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(11);
                    doc.text(`Estado de la evaluación: ${tipoCierre}`, 15, finalY + 50);
                    if (fechaCierreTexto !== '-') {
                        doc.text(`Fecha de Cierre: ${fechaCierreTexto}`, 15, finalY + 58);
                    }

                    const pageHeight = doc.internal.pageSize.height;
                    doc.setFontSize(10);
                    doc.setFont("helvetica", "normal");
                    doc.text(`Generado el ${new Date().toLocaleDateString()} - Sistema de Evaluación`, 105, pageHeight - 10, { align: "center" });

                    doc.save(`Evaluacion_${detalleAgente.agenteEvaluado.nombreAgenteEvaluado}.pdf`);
                },
                (err) => {
                    console.error('Error al obtener evaluación completa:', err);
                    Swal.fire('Error', 'No se pudo generar el PDF', 'error');
                }
            );
        }).catch(err => {
            console.error('Error al cargar totales:', err);
            Swal.fire('Error', 'No se pudieron cargar los totales', 'error');
        });
    }













    cerrarModalCerrar(): void {
        this.mostrarModalCerrar = false;
        this.motivoSeleccionado = null;
        this.fechaCierre = '';
    }


}