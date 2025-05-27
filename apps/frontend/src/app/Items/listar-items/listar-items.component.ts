import { Component, OnInit } from '@angular/core';
import { Items, ItemsService } from "../../services/items.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-listar-items',
    templateUrl: './listar-items.component.html',
    styleUrls: ['./listar-items.component.css']
})
export class ListarItemsComponent implements OnInit {
    public listitems: Items[] = [];
    public filteredItems: Items[] = []; // Array para los ítems filtrados
    public searchTerm: string = ''; // Término de búsqueda

    constructor(private _Itemservice: ItemsService, private router: Router) { }

    ngOnInit(): void {
        this.obtenerItems();
    }

    obtenerItems() {
        this._Itemservice.getItems().subscribe(
            (data: Items[]) => {
                this.listitems = data;
                this.filteredItems = data; // Inicializa filteredItems con todos los ítems
            },
            (error) => {
                // Manejo de errores
            }
        );
    }

    // Método para filtrar ítems
    filtrarItems() {
        if (!this.searchTerm) {
            this.filteredItems = this.listitems; // Si no hay término de búsqueda, mostrar todos los ítems
            return;
        }

        this.filteredItems = this.listitems.filter(item =>
            item.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    crearNuevoItemsM() {
        this.router.navigate(['CrearItemsComponetpath']); // desde router
    }

    editarItems(items: Items) {
        this.router.navigate(['editar-items', items._id]);
    }

    onPlanillaEDClick(): void {
        // Lógica para manejar el click en "Planilla Evaluación"
    }

    onVolverClick(): void {
        // Lógica para manejar el click en "Volver"
    }
}
