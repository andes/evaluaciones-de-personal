import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanillaEDService } from '../../services/PlanillaED.Service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-crear-planilla-ed-items-detalle',
    templateUrl: './crear-PlanillaEDItemsDetalle.component.html',
    styleUrls: ['./crear-PlanillaEDItemsDetalle.component.css']
})
export class CrearPlanillaEDItemsDetalleComponent implements OnInit {
    planillaId: string = '';
    descripcionPlanilla: string = '';
    efectorNombre: string = '';
    servicioNombre: string = '';
    descripcionCategoria: string = '';
    categoriaId: string = '';
    items: any[] = [];         // Ítems ya agregados a la planilla para la categoría
    todosLosItems: any[] = []; // Lista de ítems disponibles para el combo
    itemSeleccionado: string = ''; // ID del ítem seleccionado en el combo

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private planillaEDService: PlanillaEDService
    ) { }

    ngOnInit(): void {
        // Obtener parámetros de la URL
        this.route.queryParams.subscribe(params => {
            this.planillaId = params['planillaId'];
            this.descripcionPlanilla = params['descripcion'];
            this.efectorNombre = params['efector'];
            this.servicioNombre = params['servicio'];
            this.descripcionCategoria = params['descripcionCategoria'];
            this.categoriaId = params['categoriaId'];

            // Cargar los ítems existentes y los disponibles para el combo
            this.cargarItems();
            this.cargarTodosLosItems();
        });
    }

    cargarItems(): void {
        // Obtener los ítems ya agregados a la planilla para esta categoría
        this.planillaEDService.obtenerItemsPorPlanillaYCategoria(this.planillaId, this.categoriaId)
            .subscribe((response: any) => {
                this.items = response.items;
            }, error => {
                console.error('Error al cargar los ítems:', error);
            });
    }

    cargarTodosLosItems(): void {
        this.planillaEDService.obtenerItems().subscribe({
            next: items => {
                this.todosLosItems = items;
                console.log('Todos los ítems cargados para el combo:', this.todosLosItems);
            },
            error: err => console.error('Error al cargar ítems:', err)
        });
    }

    agregarNuevoItem(): void {
        // Validar que se haya seleccionado un ítem
        if (!this.itemSeleccionado) {
            console.warn('Por favor, selecciona un ítem.');
            return;
        }

        // Buscar el ítem seleccionado en el listado de todosLosItems
        const item = this.todosLosItems.find(i => i._id === this.itemSeleccionado);
        if (!item) {
            console.warn('Ítem seleccionado no encontrado en la lista.');
            return;
        }

        // Verificar si el ítem ya existe en la planilla (para evitar duplicados)
        this.planillaEDService.existsItemInPlanilla(this.planillaId, item.descripcion).subscribe({
            next: response => {
                if (response.exists) {
                    alert('El ítem ya existe en la planilla.');
                    return; // Detener el flujo si el ítem ya existe
                }

                // Construir el objeto con la estructura requerida
                const categoriaConItems = {
                    categoria: this.categoriaId,                     // La categoría ya viene por query params
                    descripcionCategoria: this.descripcionCategoria, // Usamos la descripción recibida
                    items: [{
                        idItem: item._id,
                        descripcion: item.descripcion,
                        valor: item.valor
                    }]
                };

                // Mostrar en consola lo que se enviará a la API
                console.log('Datos enviados a la API:', categoriaConItems);

                // Enviar el objeto al servicio para agregar la categoría e ítems
                this.planillaEDService.agregarCategoriaItems(this.planillaId, categoriaConItems).subscribe({
                    next: response => {
                        console.log('Categoría e ítems guardados con éxito:', response);
                        // Recargar los ítems para que se vea el cambio en la vista
                        this.cargarItems();
                        alert('Categoría e ítems guardados con éxito.');
                    },
                    error: err => {
                        console.error('Error al guardar la categoría e ítems:', err);
                    }
                });
            },
            error: err => {
                console.error('Error al verificar la existencia del ítem:', err);
            }
        });
    }

    // Nuevo método para eliminar un ítem de la planilla
    eliminarItem(item: any): void {
        console.log('Item recibido para eliminar:', item);
        if (!item || !item.descripcion) {
            console.error('El objeto item o su propiedad descripcion no están definidos.');
            return;
        }
        console.log('Planilla ID:', this.planillaId);
        this.planillaEDService.eliminarItem(this.planillaId, item.descripcion).subscribe({
            next: response => {
                console.log('Ítem eliminado correctamente:', response);
                this.cargarItems();
            },
            error: error => {
                console.error('Error al eliminar ítem:', error);
                alert('Ocurrió un error al eliminar el ítem.');
            }
        });


    }


    public onPlanillaEDClick(): void {
        this.router.navigate(['/listar-planillaEDRouter']);
    }
}
