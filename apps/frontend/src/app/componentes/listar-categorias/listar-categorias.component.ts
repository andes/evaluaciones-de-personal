import { Component, OnInit } from '@angular/core';
import { Categoria, CategoryService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css'],

})




export class ListarCategoriaComponent implements OnInit {

  public listCatgoria: Categoria[] = [];
  public mostrarModal = false;
  public modoEdicion = false;

  public categoriaSeleccionada: Categoria = {
    _id: '',
    descripcion: ''
  };

  constructor(private _CategoriaService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerCategoria();
  }

  obtenerCategoria() {
    this._CategoriaService.getCategoria().subscribe(data => {
      this.listCatgoria = data;
    }, error => {
      console.error(error);
    });
  }

  abrirModal() {
    this.mostrarModal = true;
    this.modoEdicion = false;
    this.categoriaSeleccionada = { _id: '', descripcion: '' };
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  editarCategoria(categoria: Categoria) {
    this.categoriaSeleccionada = { ...categoria };
    this.modoEdicion = true;
    this.mostrarModal = true;
  }

  guardarCategoria() {
    if (this.modoEdicion && this.categoriaSeleccionada._id) {
      this._CategoriaService.actualizarCategoria(this.categoriaSeleccionada._id, this.categoriaSeleccionada)
        .subscribe(() => {
          this.obtenerCategoria();
          this.cerrarModal();
        });
    } else {
      this._CategoriaService.guardarCategoria(this.categoriaSeleccionada)
        .subscribe(() => {
          this.obtenerCategoria();
          this.cerrarModal();
        });
    }
  }

  eliminarCategoria(id: string) {
    if (!confirm('¿Estás seguro que querés eliminar esta categoría?')) return;

    this._CategoriaService.eliminarCategoria(id).subscribe(() => {
      this.obtenerCategoria();
    });
  }
}
