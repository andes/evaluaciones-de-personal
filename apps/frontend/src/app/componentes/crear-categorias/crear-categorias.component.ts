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

    this._CategoriaService.guardarCategoria(this.nuevaCategoria).subscribe(data => {

      this.router.navigate(['/listar-categorias']);
    }, error => {

    })

      ;
  }

  volver() {

    this.router.navigate(['/ListarCategoriasComponent']);
  }
}


