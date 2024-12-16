import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Items, ItemsService } from '../../services/items.service';

@Component({
    selector: 'app-edit-items',
    templateUrl: './edit-items.component.html',
    styleUrls: ['./edit-items.component.css']
})
export class EditItemsComponent implements OnInit {
    editItemsForm: FormGroup;
    itemsId: string;

    constructor(
        private fb: FormBuilder,
        private itemsService: ItemsService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.editItemsForm = this.fb.group({
            _id: ['', Validators.required],
            descripcion: ['', Validators.required],
            valor: [null, [Validators.required, Validators.min(0)]] // Agregar el campo valor
        });

        this.itemsId = this.route.snapshot.paramMap.get('id')!;
    }

    ngOnInit(): void {
        this.itemsService.obtenerItems(this.itemsId).subscribe(data => {
            // Asignar los valores al formulario
            this.editItemsForm.patchValue({
                _id: data._id,
                descripcion: data.descripcion,
                valor: data.valor // Asignar el valor recibido
            });
        }, error => {
            console.error('Error al obtener el item:', error);
        });
    }

    onSubmit(): void {
        if (this.editItemsForm.valid) {
            this.itemsService.actualizarItems(this.itemsId, this.editItemsForm.value).subscribe(() => {
                // Redirigir a la lista de items después de la actualización
                this.router.navigate(['/ListarItems']);
            }, error => {
                console.error('Error al actualizar el item:', error);
            });
        }
    }

    cancelar(): void {
        this.router.navigate(['/categorias']);
    }
}
