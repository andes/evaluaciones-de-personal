import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanillaEDCabeceraService, PlanillaEDCabecera } from '../services/PlanillaEDCabecera.service';
import { PlanillaEDDetalleService } from '../services/PlanillaEDDetalle.service';
import { PlanillaEDService } from '../services/PlanillaED.Service';
import { PlanillaEDItemsService } from '../services/PlanillaEDIItems.service';
import { EvaluacionResultadosService } from '../services/evaluacionResulado.service';

import * as bootstrap from 'bootstrap';

@Component({
    selector: 'app-evaluacion-items',
    templateUrl: './evaluacionItems.component.html',
    styleUrls: ['./evaluacionItems.component.css']
})
export class EvaluacionItemsComponent implements OnInit {

    idEvaluacion: string = '';
    idAgente: string = '';
    cabecera: PlanillaEDCabecera | null = null;
    nombreAgenteEvaluado: string = '';
    categorias: any[] = [];
    mostrarModalValor: boolean = false;
    valorIngresado: number | null = null;
    itemSeleccionado: any = null; totalItems: number = 0;
    totalItemsConValor: number = 0;
    promedioPuntaje: number = 0;

    constructor(
        private route: ActivatedRoute,
        private cabeceraService: PlanillaEDCabeceraService,
        private detalleService: PlanillaEDDetalleService,
        //private planillaEDItemsService: PlanillaEDService,
        private planillaEDItemsService: PlanillaEDItemsService,
        private evaluacionResultadosService: EvaluacionResultadosService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const idEval = params.get('idEvaluacion');
            const idAg = params.get('idAgente');

            if (idEval && idAg) {
                this.idEvaluacion = idEval;
                this.idAgente = idAg;

                this.obtenerCabecera(this.idEvaluacion);
                this.obtenerCategoriasEItems(this.idEvaluacion, this.idAgente);

                // 📊 Consumir resultados
                this.evaluacionResultadosService.contarItems(this.idEvaluacion).subscribe({
                    next: resp => {
                        this.totalItems = resp.totalItems || 0;
                        console.log('Total items:', this.totalItems);
                    },
                    error: err => console.error('Error contarItems:', err)
                });

                this.evaluacionResultadosService.contarItemsConValor(this.idEvaluacion).subscribe({
                    next: resp => {
                        this.totalItemsConValor = resp.totalItems || 0;
                        console.log('Items con valor:', this.totalItemsConValor);
                    },
                    error: err => console.error('Error contarItemsConValor:', err)
                });

                this.evaluacionResultadosService.sumaPromediaPuntajes(this.idEvaluacion).subscribe({
                    next: resp => {
                        this.promedioPuntaje = resp.promedio || 0;
                        console.log('Suma puntajes:', resp.sumaPuntajes);
                        console.log('Cantidad:', resp.cantidad);
                        console.log('Promedio:', this.promedioPuntaje);
                    },
                    error: err => console.error('Error sumaPromediaPuntajes:', err)
                });
            }
        });

        this.route.queryParamMap.subscribe(queryParams => {
            this.nombreAgenteEvaluado = queryParams.get('nombreAgente') || '';
        });
    }




    obtenerCabecera(id: string): void {
        this.cabeceraService.obtenerCabeceraG(id).subscribe({
            next: (resp) => {
                this.cabecera = resp.data;
            },
            error: (err) => {
                console.error('❌ Error al obtener la cabecera:', err);
            }
        });
    }

    obtenerCategoriasEItems(idEval: string, idAgente: string): void {
        this.detalleService.obtenerCategoriasEItemsPorEvaluacion(idEval, idAgente).subscribe({
            next: (resp) => {
                this.categorias = resp.data;
                console.log('📦 Categorías e ítems:', this.categorias);
            },
            error: (err) => {
                console.error('❌ Error al cargar categorías e ítems:', err);
            }
        });
    }

    evaluarItem(item: any): void {
        this.itemSeleccionado = item;
        this.valorIngresado = item.puntaje != null ? item.puntaje : null;
        this.mostrarModalValor = true;
    }

    cerrarModalValor(): void {
        this.mostrarModalValor = false;
        this.valorIngresado = null;
        this.itemSeleccionado = null;
    }



    cargarResultadosEvaluacion(): void {
        if (!this.idEvaluacion) return;

        // 1) Total items
        this.evaluacionResultadosService.contarItems(this.idEvaluacion).subscribe({
            next: (resp) => {
                this.totalItems = resp && resp.totalItems != null ? resp.totalItems : 0;
                console.log('📊 Total items:', this.totalItems);
            },
            error: (err) => console.error('❌ Error al contar items:', err)
        });

        // 2) Total con valor
        this.evaluacionResultadosService.contarItemsConValor(this.idEvaluacion).subscribe({
            next: (resp) => {
                this.totalItemsConValor = resp && resp.totalItems != null ? resp.totalItems : 0;
                console.log('📊 Total items con valor:', this.totalItemsConValor);
            },
            error: (err) => console.error('❌ Error al contar items con valor:', err)
        });

        // 3) Promedio
        this.evaluacionResultadosService.sumaPromediaPuntajes(this.idEvaluacion).subscribe({
            next: (resp) => {
                this.promedioPuntaje = resp && resp.promedio != null ? resp.promedio : 0;
                console.log('📊 Promedio puntaje:', this.promedioPuntaje);
            },
            error: (err) => console.error('❌ Error al obtener promedio:', err)
        });
    }

    guardarValor(): void {
        if (this.itemSeleccionado && this.valorIngresado != null) {
            const idItemString = typeof this.itemSeleccionado.idItem === 'string'
                ? this.itemSeleccionado.idItem
                : this.itemSeleccionado.idItem._id || this.itemSeleccionado.idItem;

            const payload = {
                idPlanillaEvaluacionCabecera: this.idEvaluacion,
                idAgenteEvaluado: this.idAgente,
                idItem: idItemString,
                nuevoPuntaje: this.valorIngresado
            };

            console.log('➡️ Payload a enviar:', payload);

            this.planillaEDItemsService.actualizarPuntaje(payload).subscribe({
                next: (resp) => {
                    if (resp.success) {
                        console.log('✅ Puntaje actualizado en backend:', resp.item);
                        this.itemSeleccionado.puntaje = this.valorIngresado;
                    } else {
                        console.error('❌ Error backend:', resp.message);
                    }
                    this.cerrarModalValor();
                },
                error: (err) => {
                    console.error('❌ Error backend:', err);
                    this.cerrarModalValor();
                }
            });
        } else {
            this.cerrarModalValor();
        }
    }




}