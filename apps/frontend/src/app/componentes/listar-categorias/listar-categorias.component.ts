import { Component, OnInit } from '@angular/core';
import { Categoria, CategoryService } from '../../services/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriaComponent implements OnInit {

  public listCatgoria: Categoria[] = [];

  constructor(private _CategoriaService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerCategoria();
  }


  obtenerCategoria() {

    this._CategoriaService.getCategoria().subscribe(data => {
      console.log(data);
      this.listCatgoria = data;
    }, error => {
      console.log(error);
    })
  }
  //ruteo boton para componente crearcategoriaservice
  crearNuevaCategoriaM() {
    this.router.navigate(['CrearCategoriasComponetpath']);
  }

  editarCategoria(categoria: Categoria) {
    // Puedes pasar la ID de la categoría a la ruta de edición
    this.router.navigate(['editar-categoria', categoria._id]);
  }

}

