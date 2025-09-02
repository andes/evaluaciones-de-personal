import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanillaEDCabeceraService, PlanillaEDCabecera } from '../services/PlanillaEDCabecera.service';
import { PlanillaEDDetalleService } from '../services/PlanillaEDDetalle.service';
import { PlanillaEDItemsService } from '../services/PlanillaEDIItems.service';
import { EvaluacionResultadosService } from '../services/evaluacionResulado.service';
import { Router } from '@angular/router';

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

    // Totales
    totalItems: number = 0;
    totalItemsConValor: number = 0;
    sumaPuntajes: number = 0;
    promedioPuntajes: number = 0;

    constructor(
        private route: ActivatedRoute,
        private cabeceraService: PlanillaEDCabeceraService,
        private detalleService: PlanillaEDDetalleService,
        private planillaEDItemsService: PlanillaEDItemsService,
        private resultadosService: EvaluacionResultadosService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const idEval = params.get('idEvaluacion');
            const idAg = params.get('idAgente');

            if (idEval && idAg) {
                this.idEvaluacion = idEval;
                this.idAgente = idAg;

                this.obtenerCabecera();
                this.obtenerCategoriasEItems();
                this.cargarResultadosEvaluacion();
            }
        });

        this.route.queryParamMap.subscribe(queryParams => {
            this.nombreAgenteEvaluado = queryParams.get('nombreAgente') || '';
        });
    }

    obtenerCabecera(): void {
        if (!this.idEvaluacion) return;
        this.cabeceraService.obtenerCabeceraG(this.idEvaluacion).subscribe({
            next: (resp) => this.cabecera = resp.data,
            error: (err) => console.error('❌ Error al obtener la cabecera:', err)
        });
    }

    obtenerCategoriasEItems(): void {
        if (!this.idEvaluacion || !this.idAgente) return;
        this.detalleService.obtenerCategoriasEItemsPorEvaluacion(this.idEvaluacion, this.idAgente).subscribe({
            next: (resp) => this.categorias = resp.data,
            error: (err) => console.error('❌ Error al cargar categorías e ítems:', err)
        });
    }

    evaluarItem(item: any): void {
        this.itemSeleccionado = item;
        this.valorIngresado = (item.puntaje !== undefined && item.puntaje !== null) ? item.puntaje : null;

        this.mostrarModalValor = true;
    }

    cerrarModalValor(): void {
        this.mostrarModalValor = false;
        this.valorIngresado = null;
        this.itemSeleccionado = null;
    }

    guardarValor(): void {
        if (!this.itemSeleccionado || this.valorIngresado == null) {
            this.cerrarModalValor();
            return;
        }

        const idItemString = typeof this.itemSeleccionado.idItem === 'string'
            ? this.itemSeleccionado.idItem
            : this.itemSeleccionado.idItem._id || this.itemSeleccionado.idItem;

        const payload = {
            idPlanillaEvaluacionCabecera: this.idEvaluacion,
            idAgenteEvaluado: this.idAgente,
            idItem: idItemString,
            nuevoPuntaje: this.valorIngresado
        };

        this.planillaEDItemsService.actualizarPuntaje(payload).subscribe({
            next: (resp) => {
                if (resp.success) {
                    this.itemSeleccionado.puntaje = this.valorIngresado;
                    this.cargarResultadosEvaluacion(); // 🔄 actualizar totales
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
    }

    cargarResultadosEvaluacion(): void {
        if (!this.idEvaluacion || !this.idAgente) return;

        this.resultadosService.obtenerTotales(this.idEvaluacion, this.idAgente).subscribe(resp => {
            this.totalItems = Number(resp.totalItems) || 0;
            this.sumaPuntajes = Number(resp.totalPuntaje) || 0;

            this.resultadosService.contarItemsConValor(this.idEvaluacion, this.idAgente).subscribe(respValor => {
                this.totalItemsConValor = Number(respValor.totalItems) || 0;
                this.promedioPuntajes = this.totalItemsConValor > 0
                    ? this.sumaPuntajes / this.totalItemsConValor
                    : 0;
                console.log('📊 Totales actualizados', this.totalItemsConValor, this.promedioPuntajes);
            }, err => console.error(err));
        }, err => console.error(err));
    }

    volver(): void {
        this.router.navigate(['/evaluacion-agente', this.idEvaluacion]);
    }


}
