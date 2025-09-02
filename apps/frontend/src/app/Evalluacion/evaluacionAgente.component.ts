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
                console.log('📌 ID recibido desde ruta:', id);
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
                console.log('📌 ID recibido desde ruta:', id);
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
        console.log(' Evaluar agente:', agente);

        // Validar que se haya seleccionado un tipo de evaluación
        if (!this.idTipoEvaluacion) {
            Swal.fire({
                icon: 'warning',
                title: 'Tipo de evaluación requerido',
                text: 'Seleccioná un tipo de evaluación antes de continuar.',
            });
            return;
        }

        // Obtener la planilla por tipo de evaluación
        this.planillaService.getPlanillaPorTipoEvaluacion(this.idTipoEvaluacion).subscribe({
            next: (planilla) => {
                // Validar existencia de planilla
                if (!planilla || !planilla._id) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Planilla no encontrada',
                        text: 'No se encontró una planilla válida para el tipo de evaluación seleccionado. Por favor, elegí un tipo existente.',
                    });
                    return; // Detiene el flujo y no graba nada
                }

                // Guardar categorías de la planilla
                this.categoriasDesdePlanilla = planilla.categorias || [];

                // Transformar categorías e ítems
                const categoriasTransformadas = this.categoriasDesdePlanilla.map(cat => ({
                    idCategoria: cat.categoria._id,
                    descripcionCategoria: cat.categoria.descripcion,
                    items: cat.items.map(item => ({
                        idItem: item._id,
                        descripcion: item.descripcion,
                        puntaje: 0
                    }))
                }));

                // Crear objeto de detalle de evaluación
                const detalleEvaluacion = {
                    _id: this.generateFakeObjectId(),
                    idPlanillaEvaluacionCabecera: this.idCabecera,
                    agenteEvaluado: {
                        idAgenteEvaluado: agente._id,
                        nombreAgenteEvaluado: agente.nombre
                    },
                    categorias: categoriasTransformadas
                };

                // Verificar si el agente ya fue evaluado
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

    abrirModalCerrar(idEvaluacion: string, nombreAgente: string) {
        this.idCabeceraEvaluacion = idEvaluacion;
        this.nombreAgenteCerrar = nombreAgente; // guardás el nombre
        this.fechaCierre = this.obtenerFechaHoy();
        this.mostrarModalCerrar = true;
        this.tipoCierreEvaluacionService.obtenerTodos().subscribe({
            next: (motivos: TipoCierreEvaluacion[]) => {
                // Mapear para que cada motivo tenga 'id' y 'nombre'
                this.motivosCierre = motivos.map(motivo => ({
                    id: (motivo as any).id || (motivo as any)._id,  // aseguro que tenga 'id'
                    nombre: motivo.nombre
                }));

                console.log('✅ Motivos de cierre mapeados:', this.motivosCierre);
            },
            error: (err) => {
                console.error('❌ Error al obtener motivos:', err);
            }
        });


    }

    obtenerFechaHoy(): string {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }


    //verifica que la evaluacion seleccionada exista


    confirmarCierre(): void {
        // Validar que se haya seleccionado un motivo y una fecha
        if (!this.motivoSeleccionado || !this.fechaCierre) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Debes seleccionar un motivo y una fecha de cierre.'
            });
            return;
        }

        // Armar el payload con los datos requeridos por el backend
        const cierrePayload = {
            tipoCierreEvaluacion: {
                id: this.motivoSeleccionado.id,
                nombre: this.motivoSeleccionado.nombre
            },
            fechaCierre: this.fechaCierre
        };
        console.log('Payload enviado:', cierrePayload);
        console.log(' ID de evaluación:', this.idCabeceraEvaluacion);

        this.planillaCabeceraService.actualizarCierreEvaluacion(this.idCabeceraEvaluacion, cierrePayload)
            .subscribe({
                next: (res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'La evaluación fue cerrada correctamente.'
                    });

                    // Cerrar el modal y limpiar campos
                    this.cerrarModalCerrar();

                    // (Opcional) Recargar agentes evaluados si querés que se actualice automáticamente
                    this.cargarAgentesEvaluados(this.idCabecera);
                },
                error: (err) => {
                    console.error('❌ Error al cerrar evaluación:', err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al cerrar la evaluación.'
                    });
                }

            });

    }

    seleccionarAgente(agente: any) {
        this.agenteSeleccionado = agente;

        if (agente && (agente._id || agente.idAgenteEvaluado)) {
            const idAgente = agente.idAgenteEvaluado || agente._id;

            this.cargarTotales(this.idCabecera, idAgente)
                .then(() => console.log('Totales cargados'))
                .catch((err) => console.error('Error al cargar totales:', err));
        }
    }
    cargarTotales(idCabecera: string, idAgente: string): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log('📌 Llamando a obtenerTotales con:', { idCabecera, idAgente });

            this.evaluacionResultadosService.obtenerTotales(idCabecera, idAgente).subscribe({
                next: (resp) => {
                    console.log('📌 Respuesta de la API obtenerTotales:', resp);

                    const totalItems = resp && resp.totalItems ? resp.totalItems : 0;
                    const sumaPuntajes = resp && resp.totalPuntaje ? resp.totalPuntaje : 0;

                    this.totalItemsConValor = totalItems;
                    this.sumaPuntajes = sumaPuntajes;
                    this.promedioPuntaje = totalItems > 0 ? sumaPuntajes / totalItems : 0;

                    console.log(`📌 Totales calculados -> totalItems: ${totalItems}, sumaPuntajes: ${sumaPuntajes}, promedio: ${this.promedioPuntaje}`);

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

        // 🔹 Primero cargamos los totales desde el backend
        this.cargarTotales(idCabecera, idAgente).then(() => {
            console.log('📌 Totales cargados:', this.totalItemsConValor, this.sumaPuntajes, this.promedioPuntaje);

            const totalItems = this.totalItemsConValor;
            const sumaPuntajes = this.sumaPuntajes;
            const promedio = this.promedioPuntaje;

            // 🔹 Obtenemos la evaluación completa
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

                    // 🔹 Cabecera principal
                    doc.setFontSize(18);
                    doc.setFont("helvetica", "bold");
                    doc.text("Evaluación de Desempeño", 105, 15, { align: "center" });

                    // 🔹 Datos del agente
                    doc.setFontSize(12);
                    doc.setFont("helvetica", "normal");
                    doc.text(`Legajo: ${detalleAgente.agenteEvaluado.legajo || '-'}`, 10, 30);
                    doc.text(`Nombre: ${detalleAgente.agenteEvaluado.nombreAgenteEvaluado.toUpperCase()}`, 10, 38);

                    // 🔹 Datos de la evaluación
                    doc.text(`Efector: ${resp.cabecera.Efector.nombre}`, 10, 50);
                    doc.text(`Servicio: ${resp.cabecera.Servicio.nombre}`, 10, 58);
                    doc.text(`Período: ${new Date(resp.cabecera.periodo).toLocaleDateString()}`, 10, 66);

                    // 🔹 Construcción de filas por categoría e ítems
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

                    // 🔹 Final de tabla
                    let finalY = 75;
                    if ((doc as any).lastAutoTable) {
                        finalY = (doc as any).lastAutoTable.finalY;
                    }

                    // 🔹 Cuadro con totales
                    doc.setDrawColor(0);
                    doc.setFillColor(240, 240, 240);
                    doc.rect(10, finalY + 10, 190, 35, 'FD');

                    doc.setFontSize(12);
                    doc.setFont("helvetica", "bold");
                    doc.text(`Total de ítems con valor: ${totalItems}`, 15, finalY + 18);
                    doc.text(`Suma de puntajes: ${sumaPuntajes}`, 15, finalY + 25);
                    doc.text(`Promedio de puntaje: ${promedio.toFixed(2)}`, 15, finalY + 32);

                    // 🔹 Estado y fecha de cierre (FUERA DEL CUADRO)
                    let tipoCierre = '-';
                    if (resp.cabecera.tipoCierreEvaluacion && resp.cabecera.tipoCierreEvaluacion.nombre) {
                        tipoCierre = resp.cabecera.tipoCierreEvaluacion.nombre;
                    }

                    let fechaCierreTexto = '';
                    if (tipoCierre !== 'Evaluación Abierta') {
                        fechaCierreTexto = resp.cabecera.fechaCierre
                            ? new Date(resp.cabecera.fechaCierre).toLocaleDateString()
                            : '-';
                    }

                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(11);
                    // Lo colocamos justo debajo del cuadro de totales
                    doc.text(`Estado de la evaluación: ${tipoCierre}`, 15, finalY + 50);
                    if (fechaCierreTexto) {
                        doc.text(`Fecha de Cierre: ${fechaCierreTexto}`, 15, finalY + 58);
                    }

                    // 🔹 Pie de página
                    const pageHeight = doc.internal.pageSize.height;
                    doc.setFontSize(10);
                    doc.setFont("helvetica", "normal");
                    doc.text(`Generado el ${new Date().toLocaleDateString()} - Sistema de Evaluación`, 105, pageHeight - 10, { align: "center" });

                    // 🔹 Guardamos el PDF
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