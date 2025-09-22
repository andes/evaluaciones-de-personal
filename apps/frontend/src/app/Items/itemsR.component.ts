import { Component, OnInit } from '@angular/core';
import { ItemsRService, ItemsR } from '../services/itemsR.service';
const Swal = require('sweetalert2').default;

@Component({
    selector: 'app-items-r',
    templateUrl: './itemsR.component.html',
    styleUrls: ['./itemsR.component.css']
})
export class ItemsRComponent implements OnInit {

    public listaItemsR: ItemsR[] = [];
    public mostrarModal = false;
    public modoEdicion = false;

    public itemSeleccionado: ItemsR = {
        _id: '',
        descripcion: '',
        valor: 0
    };

    constructor(private itemsRService: ItemsRService) { }

    ngOnInit(): void {
        this.obtenerItemsR();
    }

    obtenerItemsR() {
        this.itemsRService.getItemsR().subscribe(data => {
            console.log('Items recibidos:', data);
            this.listaItemsR = data;
        }, error => {
            console.error('Error al obtener ítems:', error);
        });
    }


    abrirModal() {
        this.mostrarModal = true;
        this.modoEdicion = false;
        this.itemSeleccionado = { _id: '', descripcion: '', valor: 0 };
    }

    cerrarModal() {
        this.mostrarModal = false;
    }

    editarItemR(item: ItemsR) {
        this.itemSeleccionado = { ...item };
        this.modoEdicion = true;
        this.mostrarModal = true;
    }

    guardarItemR() {
        if (this.modoEdicion && this.itemSeleccionado._id) {
            this.itemsRService.updateItemR(this.itemSeleccionado._id, this.itemSeleccionado).subscribe(() => {
                this.obtenerItemsR();
                this.cerrarModal();
            });
        } else {
            this.itemsRService.createItemR(this.itemSeleccionado).subscribe(() => {
                this.obtenerItemsR();
                this.cerrarModal();
            });
        }
    }



    eliminarItemR(id: string) {
        if (!confirm('¿Estás seguro que querés eliminar este ítem?')) return;

        this.itemsRService.deleteItemR(id).subscribe(() => {
            this.obtenerItemsR();
        });
    }
}