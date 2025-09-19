import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria, CategoryService } from '../../services/categoria.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-edit-categorias',
    templateUrl: './edit-categoria.component.html',
    styleUrls: ['./edit-categoria.component.css']


})
export class EditCategoriasComponent implements OnInit {
    editCategoriaForm: FormGroup;
    categoriaId: string;

    constructor(
        private fb: FormBuilder,
        private categoriaService: CategoryService,
        private route: ActivatedRoute,
        private router: Router
    ) {

        this.editCategoriaForm = this.fb.group({
            _id: ['', Validators.required], // Agrega el campo _id aquí
            descripcion: ['', Validators.required]
        });
        // Obtener el ID de la categoría desde la URL   
        this.categoriaId = this.route.snapshot.paramMap.get('id')!;
    }

    ngOnInit(): void {

        this.categoriaService.obtenerCategoria(this.categoriaId).subscribe(data => {



            this.editCategoriaForm.patchValue({
                _id: data._id,  // 
                descripcion: data.descripcion
            });
        }, error => {
            console.error('Error al obtener la categoría:', error);
        });
    }



    onSubmit(): void {
        if (this.editCategoriaForm.valid) {
            this.categoriaService.actualizarCategoria(this.categoriaId, this.editCategoriaForm.value).subscribe(() => {

                this.router.navigate(['/ListarCategoriasComponent']);
            });
        }
    }

    cancelar(): void {

        this.router.navigate(['/categorias']);
    }


}