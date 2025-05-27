
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanillaEDService } from '../../services/PlanillaED.Service';
import { CategoryService } from '../../services/categoria.service';

const Swal = require('sweetalert2').default;

@Component({
    selector: 'app-crear-planilla-ed-items',
    templateUrl: './crear-PlanillaEDItems.component.html',
    styleUrls: ['./crear-PlanillaEDItems.component.css']
})
export class CrearPlanillaEDItemsComponent implements OnInit {
    idPlanilla = '';
    descripcionPlanilla = '';
    efectorNombre = '';
    servicioNombre = '';
    categorias: any[] = [];
    categoriasPlanilla: any[] = [];
    categoriaSeleccionada = '';
    items: any[] = [];
    itemSeleccionado = '';

    constructor(
        private route: ActivatedRoute,
        private _PlanillaEDService: PlanillaEDService,
        private _CategoryService: CategoryService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.idPlanilla = params['id'];
            this.descripcionPlanilla = params['descripcion'];
            this.efectorNombre = params['efector'];
            this.servicioNombre = params['servicio'];
            this.cargarItems();
            this.cargarCategorias();
            this.cargarCategoriasDePlanilla();
        });
    }

    cargarItems(): void {
        this._PlanillaEDService.obtenerItems().subscribe({
            next: items => this.items = items,
            error: err => console.error('Error al cargar items:', err)
        });
    }

    cargarCategorias(): void {
        this._CategoryService.obtenerCategoriasOrdenadas().subscribe({
            next: categorias => this.categorias = categorias,
            error: err => console.error('Error al cargar categorías:', err)
        });
    }

    cargarCategoriasDePlanilla(): void {
        if (!this.idPlanilla) {
            console.warn('No se ha recibido un idPlanilla válido.');
            return;
        }
        this._PlanillaEDService.obtenerCategoriasPorPlanilla(this.idPlanilla).subscribe({
            next: data => this.categoriasPlanilla = data.categorias,
            error: err => console.error('Error al cargar categorías de la planilla:', err)
        });
    }

    aceptarSeleccion(): void {
        if (!this.categoriaSeleccionada || !this.itemSeleccionado) {
            Swal.fire({
                icon: 'warning',
                title: 'Datos incompletos',
                text: 'Selecciona categoría e ítem antes de continuar.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        const categoria = this.categorias.find(cat => cat._id === this.categoriaSeleccionada);
        const item = this.items.find(i => i._id === this.itemSeleccionado);
        if (!categoria || !item) {
            Swal.fire({
                icon: 'error',
                title: 'Selección inválida',
                text: 'No se encontró la categoría o el ítem.',
                confirmButtonText: 'Cerrar'
            });
            return;
        }

        this._PlanillaEDService.existsItemInPlanilla(this.idPlanilla, item.descripcion).subscribe({
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
                    categoria: categoria._id,
                    descripcionCategoria: categoria.descripcion,
                    items: [{ idItem: item._id, descripcion: item.descripcion, valor: item.valor }]
                };

                this._PlanillaEDService.agregarCategoriaItems(this.idPlanilla, categoriaConItems).subscribe({
                    next: () => {
                        this.cargarCategoriasDePlanilla();
                        Swal.fire({
                            icon: 'success',
                            title: 'Guardado con éxito',
                            text: 'Categoría e ítems guardados correctamente.',
                            confirmButtonText: 'OK'
                        });
                    },
                    error: err => {
                        console.error('Error al guardar la categoría e ítems:', err);
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
                console.error('Error al verificar la existencia del ítem:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al verificar la existencia del ítem.',
                    confirmButtonText: 'Cerrar'
                });
            }
        });
    }

    navegarADetalle(categoriaId: string, descripcionCategoria: string): void {
        this.router.navigate([`/crear-planilla-ed-items-detalle/${categoriaId}`], {
            queryParams: {
                planillaId: this.idPlanilla,
                descripcion: this.descripcionPlanilla,
                efector: this.efectorNombre,
                servicio: this.servicioNombre,
                descripcionCategoria,
                categoriaId
            }
        });
    }

    onPlanillaEDClick(): void {
        this.router.navigate(['/listar-planillaEDRouter']);
    }
}
