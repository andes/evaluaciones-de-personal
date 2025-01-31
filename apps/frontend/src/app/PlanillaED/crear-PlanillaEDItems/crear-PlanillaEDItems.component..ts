import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanillaEDService } from '../../services/PlanillaED.Service';
import { CategoryService } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-crear-planilla-ed-items',
    templateUrl: './crear-PlanillaEDItems.component.html',
    styleUrls: ['./crear-PlanillaEDItems.component.css']
})
export class CrearPlanillaEDItemsComponent implements OnInit {
    idPlanilla: string = '';
    descripcionPlanilla: string = '';
    efectorNombre: string = '';
    servicioNombre: string = '';
    categorias: any[] = [];
    categoriasPlanilla: any[] = [];
    categoriaSeleccionada: string = '';
    items: any[] = [];
    itemSeleccionado: string = '';

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
            console.log('Parametros recibidos:', params);
        });

        this.cargarItems();
        this.cargarCategorias();
        this.cargarCategoriasDePlanilla();
    }

    cargarItems(): void {
        this._PlanillaEDService.obtenerItems().subscribe({
            next: items => {
                this.items = items;
                console.log('Items cargados:', items);
            },
            error: err => console.error('Error al cargar items:', err)
        });
    }

    cargarCategorias(): void {
        this._CategoryService.obtenerCategoriasOrdenadas().subscribe({
            next: categorias => {
                this.categorias = categorias.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
                console.log('Categorías cargadas:', this.categorias);
            },
            error: err => console.error('Error al cargar categorías:', err)
        });
    }

    cargarCategoriasDePlanilla(): void {
        if (!this.idPlanilla) {
            console.warn('No se ha recibido un idPlanilla válido.');
            return;
        }
        this._PlanillaEDService.obtenerCategoriasPorPlanilla(this.idPlanilla).subscribe({
            next: data => {
                this.categoriasPlanilla = data.categorias;
                console.log('Categorías de la planilla cargadas:', this.categoriasPlanilla);
            },
            error: err => console.error('Error al cargar categorías de la planilla:', err)
        });
    }

    aceptarSeleccion(): void {
        console.log('Intentando agregar ítems...');

        if (!this.categoriaSeleccionada || !this.itemSeleccionado) {
            console.warn('Por favor, selecciona una categoría y un ítem antes de continuar.');
            return;
        }

        // Depurar valores antes de buscarlos
        console.log('Categoría seleccionada:', this.categoriaSeleccionada);
        console.log('Ítem seleccionado:', this.itemSeleccionado);

        // Buscar la categoría
        const categoria = this.categorias.find(cat => cat._id === this.categoriaSeleccionada);
        if (!categoria) {
            console.warn('Categoría seleccionada no encontrada.');
            return;
        }

        // Buscar el ítem seleccionado
        const item = this.items.find(item => item._id === this.itemSeleccionado);
        if (!item) {
            console.warn('Ítem seleccionado no encontrado en la lista de ítems.');
            return;
        }

        // Verificar que el ítem tiene todos los datos necesarios
        console.log('Ítem encontrado:', item);

        // Construir el objeto correctamente
        const categoriaConItems = {
            categoria: categoria._id,
            descripcionCategoria: categoria.descripcion,
            items: [{
                idItem: item._id,
                descripcion: item.descripcion,
                valor: item.valor
            }]
        };

        // Mostrar en la consola antes de enviar
        console.log('Datos enviados a la API:', categoriaConItems);

        // Enviar al servicio
        this._PlanillaEDService.agregarCategoriaItems(this.idPlanilla, categoriaConItems).subscribe({
            next: response => {
                console.log('Categoría e ítems guardados con éxito:', response);
                this.cargarCategoriasDePlanilla();
                alert('Categoría e ítems guardados con éxito.');
            },
            error: err => {
                console.error('Error al guardar la categoría e ítems:', err);
                if (err.error) {
                    console.error('Detalles del error:', err.error);
                }
            }
        });
    }

    navegarADetalle(categoriaId: string, descripcionCategoria: string): void {
        const queryParams = {
            planillaId: this.idPlanilla,
            descripcion: this.descripcionPlanilla,
            efector: this.efectorNombre,
            servicio: this.servicioNombre,
            descripcionCategoria,
            categoriaId
        };
        console.log('Navegando a detalle con parámetros:', queryParams);
        this.router.navigate([`/crear-planilla-ed-items-detalle/${categoriaId}`], { queryParams });
    }
}
