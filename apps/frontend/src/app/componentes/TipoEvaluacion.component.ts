import { Component, OnInit } from '@angular/core';
import { TipoEvaluacion, TipoEvaluacionService } from '../services/tipoevaluacion.service';

@Component({
    selector: 'app-tipo-evaluacion',
    templateUrl: './TipoEvaluacion.component.html',
    styleUrls: ['./TipoEvaluacion.component.css']
})
export class TipoEvaluacionComponent implements OnInit {
    tiposEvaluacion: TipoEvaluacion[] = [];
    mostrarModal = false;
    modoEdicion = false;

    tipoSeleccionado: TipoEvaluacion = {
        nombre: '',
        descripcion: ''
    };

    constructor(private tipoService: TipoEvaluacionService) { }

    ngOnInit(): void {
        this.cargarTipos();
    }

    cargarTipos() {
        this.tipoService.obtenerTipos().subscribe(
            (data) => (this.tiposEvaluacion = data),
            (error) => console.error('Error al cargar tipos', error)
        );
    }

    abrirModal() {
        this.mostrarModal = true;
        this.modoEdicion = false;
        this.tipoSeleccionado = { nombre: '', descripcion: '' };
    }

    cerrarModal() {
        this.mostrarModal = false;
    }

    editarTipo(tipo: TipoEvaluacion) {
        this.tipoSeleccionado = { ...tipo };
        this.modoEdicion = true;
        this.mostrarModal = true;
    }

    guardarTipo() {
        if (this.modoEdicion && this.tipoSeleccionado._id) {
            this.tipoService.actualizarTipo(this.tipoSeleccionado._id, this.tipoSeleccionado).subscribe({
                next: () => {
                    this.cargarTipos();
                    this.cerrarModal();
                },
                error: (e) => console.error('Error al actualizar', e),
            });
        } else {
            this.tipoService.crearTipo(this.tipoSeleccionado).subscribe({
                next: () => {
                    this.cargarTipos();
                    this.cerrarModal();
                },
                error: (e) => console.error('Error al crear', e),
            });
        }
    }

    eliminarTipo(id: string) {
        if (!confirm('¿Estás seguro que querés eliminar este tipo?')) return;

        this.tipoService.eliminarTipo(id).subscribe({
            next: () => this.cargarTipos(),
            error: (e) => console.error('Error al eliminar', e),
        });
    }
}