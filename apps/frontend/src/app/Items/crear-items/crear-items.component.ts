import { Component } from '@angular/core';
import { Items, ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-Items',
  templateUrl: './crear-items.component.html',
  styleUrls: ['./crear-items.component.css']
})
export class CrearItemsComponent {

  nuevoItems: Items = {
    //_id: '',
    descripcion: '',
    valor: 0
  };
  mensajeExito: string | null = null;
  constructor(private _ItemsService: ItemsService, private router: Router) { }

  crearNuevoItems() {
    console.log('Nuevo ítem a guardar:', this.nuevoItems);  // Verifica los datos antes de enviarlos
    this._ItemsService.guardarItems(this.nuevoItems).subscribe({
      next: (data) => {
        console.log('Ítem creado con éxito:', data);
        this.router.navigate(['/ListarItems']);
      },
      error: (error) => {
        console.error('Error al guardar el ítem:', error);
        alert('Ocurrió un error al crear el ítem.');
      }
    });

  }


  volver() {
    // Navega de regreso a la lista de categorías
    this.router.navigate(['/ListarItemsComponent']);
  }
}


