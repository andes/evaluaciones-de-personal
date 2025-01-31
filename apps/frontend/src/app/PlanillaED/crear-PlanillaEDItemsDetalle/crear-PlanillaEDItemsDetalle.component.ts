import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-crear-planilla-ed-items-detalle',
    templateUrl: './crear-PlanillaEDItemsDetalle.component.html',
    styleUrls: ['./crear-PlanillaEDItemsDetalle.component.css']
})
export class CrearPlanillaEDItemsDetalleComponent implements OnInit {
    planillaId: string = ''
    descripcionPlanilla: string = '';
    efectorNombre: string = '';
    servicioNombre: string = '';
    descripcionCategoria: string = ''; // Nueva propiedad para la descripción de la categoría
    categoriaId: string = '';

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.planillaId = params['planillaId'];
            this.descripcionPlanilla = params['descripcion'];
            this.efectorNombre = params['efector'];
            this.servicioNombre = params['servicio'];
            this.descripcionCategoria = params['descripcionCategoria']; // Capturar la descripción de la categoría
            this.categoriaId = params['categoriaId'];
        });
    }
}
