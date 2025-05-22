import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanillaEDService } from '../../services/PlanillaED.Service';

const Swal = require('sweetalert2').default;

@Component({
    selector: 'app-crear-planilla-ed-items-detalle',
    templateUrl: './crear-PlanillaEDItemsDetalle.component.html',
    styleUrls: ['./crear-PlanillaEDItemsDetalle.component.css']
})
export class CrearPlanillaEDItemsDetalleComponent implements OnInit {
    planillaId = '';
    descripcionPlanilla = '';
    efectorNombre = '';
    servicioNombre = '';
    descripcionCategoria = '';
    categoriaId = '';
    items: any[] = [];
    todosLosItems: any[] = [];
    itemSeleccionado = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private planillaEDService: PlanillaEDService
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.planillaId = params['planillaId'];
            this.descripcionPlanilla = params['descripcion'];
            this.efectorNombre = params['efector'];
            this.servicioNombre = params['servicio'];
            this.descripcionCategoria = params['descripcionCategoria'];
            this.categoriaId = params['categoriaId'];
            this.cargarItems();
            this.cargarTodosLosItems();
        });
    }

    cargarItems(): void {
        this.planillaEDService.obtenerItemsPorPlanillaYCategoria(this.planillaId, this.categoriaId)
            .subscribe({
                next: (resp: any) => this.items = resp.items,
                error: err => console.error('Error al cargar los ítems:', err)
            });
    }

    cargarTodosLosItems(): void {
        this.planillaEDService.obtenerItems().subscribe({
            next: items => this.todosLosItems = items,
            error: err => console.error('Error al cargar ítems:', err)
        });
    }

    agregarNuevoItem(): void {
        if (!this.itemSeleccionado) {
            console.warn('Por favor, selecciona un ítem.');
            return;
        }
        const item = this.todosLosItems.find(i => i._id === this.itemSeleccionado);
        if (!item || !item.descripcion) {
            console.warn('Ítem seleccionado no encontrado o sin descripción.');
            return;
        }

        this.planillaEDService.existsItemInPlanilla(this.planillaId, item.descripcion).subscribe({
            next: response => {
                if (response.exists) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Ítem duplicado',
                        text: 'El ítem ya existe en la planilla.',
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }

                const categoriaConItems = {
                    categoria: this.categoriaId,
                    descripcionCategoria: this.descripcionCategoria,
                    items: [{
                        idItem: item._id,
                        descripcion: item.descripcion,
                        valor: item.valor
                    }]
                };

                this.planillaEDService.agregarCategoriaItems(this.planillaId, categoriaConItems).subscribe({
                    next: _ => {
                        this.cargarItems();
                        Swal.fire({
                            icon: 'success',
                            title: 'Guardado con éxito',
                            text: 'Categoría e ítems guardados correctamente.',
                            confirmButtonText: 'OK'
                        });
                    },
                    error: err => {
                        console.error('Error al guardar:', err);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'No se pudo guardar la categoría e ítems.',
                            confirmButtonText: 'Cerrar'
                        });
                    }
                });
            },
            error: err => {
                console.error('Error al verificar existencia:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al verificar la existencia del ítem.',
                    confirmButtonText: 'Cerrar'
                });
            }
        });
    }

    eliminarItem(item: any): void {

        if (!item || !item.descripcion) {
            console.error('El objeto item o su propiedad descripcion no están definidos.');
            return;
        }
        this.planillaEDService.eliminarItem(this.planillaId, item.descripcion).subscribe({
            next: _ => this.cargarItems(),
            error: err => {
                console.error('Error al eliminar ítem:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al eliminar el ítem.',
                    confirmButtonText: 'Cerrar'
                });
            }
        });
    }

    onPlanillaEDClick(): void {
        this.router.navigate(['/listar-planillaEDRouter']);
    }
}
