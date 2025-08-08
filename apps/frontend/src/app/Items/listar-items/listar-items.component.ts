import { Component, OnInit } from '@angular/core';
import { Items, ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-listar-items',
    templateUrl: './listar-items.component.html',
    styleUrls: ['./listar-items.component.css']
})
export class ListarItemsComponent implements OnInit {

    listaItems: Items[] = [];
    mostrarModal = false;
    modoEdicion = false;

    itemSeleccionado: Items = {
        _id: '',
        descripcion: '',
        valor: 0
    };

    constructor(private itemsService: ItemsService) { }

    ngOnInit(): void {
        this.obtenerItems();
    }

    obtenerItems(): void {
        this.itemsService.obtenerItemss().subscribe({
            next: (data) => {
                this.listaItems = data;
            },
            error: () => {
                alert('Error al obtener los ítems');
            }
        });
    }

    abrirModal(): void {
        this.mostrarModal = true;
        this.modoEdicion = false;
        this.itemSeleccionado = {
            _id: '',
            descripcion: '',
            valor: 0
        };
    }

    cerrarModal(): void {
        this.mostrarModal = false;
    }

    editarItem(item: Items): void {
        this.itemSeleccionado = { ...item };
        this.modoEdicion = true;
        this.mostrarModal = true;
    }

    guardarItem(): void {
        if (this.modoEdicion && this.itemSeleccionado._id) {
            this.itemsService.actualizarItems(this.itemSeleccionado._id, this.itemSeleccionado).subscribe(() => {
                this.obtenerItems();
                this.cerrarModal();
            });
        } else {
            this.itemsService.guardarItems(this.itemSeleccionado).subscribe(() => {
                this.obtenerItems();
                this.cerrarModal();
            });
        }
    }

    eliminarItem(id: string): void {
        if (confirm('¿Estás seguro que querés eliminar este ítem?')) {
            this.itemsService.eliminarItems(id).subscribe(() => {
                this.obtenerItems();
            });
        }
    }
}   