import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanillaEDCabeceraService, PlanillaEDCabecera } from '../services/PlanillaEDCabecera.service';
import { PlanillaEDDetalleService } from '../services/PlanillaEDDetalle.service';
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
    itemSeleccionado: any = null;

    constructor(
        private route: ActivatedRoute,
        private cabeceraService: PlanillaEDCabeceraService,
        private detalleService: PlanillaEDDetalleService
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

    guardarValor(): void {
        if (this.itemSeleccionado) {
            this.itemSeleccionado.puntaje = this.valorIngresado;
            console.log('✅ Valor guardado:', this.itemSeleccionado);
        }
        this.cerrarModalValor();
    }


}