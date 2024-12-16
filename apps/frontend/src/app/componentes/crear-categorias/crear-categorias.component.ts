import { Component } from '@angular/core';
import { Categoria, CategoryService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-crear-categorias',
  templateUrl: './crear-categorias.component.html',
  styleUrls: ['./crear-categorias.component.css']
})
export class CrearCategoriasComponent {

  nuevaCategoria: Categoria = {
    _id: '',
    descripcion: ''
  };
  mensajeExito: string | null = null;
  constructor(private _CategoriaService: CategoryService, private router: Router) { }

  crearNuevaCategoria() {
    console.log('intentando crear un nuero items')
    this._CategoriaService.guardarCategoria(this.nuevaCategoria).subscribe(data => {
      console.log('Categoría creada:', data);
      this.router.navigate(['/listar-categorias']);  // Redirecciona a la lista de categorías después de crearla
    }, error => {
      console.log('Error al crear la categoría:', error);
    })

      ;
  }

  volver() {
    // Navega de regreso a la lista de categorías
    this.router.navigate(['/ListarCategoriasComponent']);
  }
}


