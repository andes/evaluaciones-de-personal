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
        this.categoriaId = this.route.snapshot.paramMap.get('id')!;

        // Definir el formulario con validación asíncrona en la descripción
        this.editCategoriaForm = this.fb.group({
            _id: ['', Validators.required],
            descripcion: ['',
                Validators.required,
                this.descripcionUnicaValidator.bind(this) // Validador asíncrono
            ]
        });
    }

    ngOnInit(): void {
        this.categoriaService.obtenerCategoria(this.categoriaId).subscribe(data => {
            this.editCategoriaForm.patchValue({
                _id: data._id,
                descripcion: data.descripcion
            });
        }, error => {
            console.error('Error al obtener la categoría:', error);
        });
    }

    // descripcionUnicaValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    //     if (!control.value) {
    //         return new Observable<null>(observer => observer.next(null)); // Si el campo está vacío, no hacer validación
    //     }

    //     return this.categoriaService.verificarDescripcionUnica(control.value)
    //         .pipe(
    //             map(isUnique => {
    //                 return isUnique ? null : { descripcionNoUnica: true }; // Si no es única, retorna un error
    //             })
    //         );
    // }

    //agrego depuradores
    descripcionUnicaValidator(control: AbstractControl): Observable<ValidationErrors | null> {
        if (!control.value) {
            return new Observable<null>(observer => observer.next(null)); // Si no hay valor, no validamos
        }

        console.log('Verificando descripción:', control.value); // Log para ver qué valor estamos verificando

        return this.categoriaService.verificarDescripcionUnica(control.value)
            .pipe(
                map(isUnique => {
                    console.log('Resultado de verificación:', isUnique); // Log para ver el resultado de la API
                    return isUnique ? null : { descripcionNoUnica: true }; // Si no es única, marca el error
                })
            );
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
