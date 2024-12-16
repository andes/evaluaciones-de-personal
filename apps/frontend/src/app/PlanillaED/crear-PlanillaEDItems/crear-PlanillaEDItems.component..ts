import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-crear-planilla-ed-items',
    templateUrl: './crear-PlanillaEDItems.component.html',
    styleUrls: ['./crear-PlanillaEDItems.component.css']
})
export class CrearPlanillaEDItemsComponent implements OnInit {
    planillaId: string = ''; // ID de la planilla pasada como parámetro
    items: any[] = []; // Lista de ítems
    nuevoItem: any = { descripcion: '', valor: 0 }; // Estructura para un nuevo ítem

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        // Obtener el ID de la planilla desde la URL
        this.planillaId = this.route.snapshot.paramMap.get('id') || '';
        console.log('ID de la planilla recibida:', this.planillaId);
    }

    agregarItem() {
        // Aquí puedes implementar la lógica para agregar ítems a la planilla
        this.items.push({ ...this.nuevoItem });
        console.log('Ítem agregado:', this.nuevoItem);
        // Limpiar el formulario después de agregar
        this.nuevoItem = { descripcion: '', valor: 0 };
    }

    eliminarItem(index: number) {
        // Eliminar ítem de la lista
        this.items.splice(index, 1);
    }
}
