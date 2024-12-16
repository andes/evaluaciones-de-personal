import { Component, OnInit } from '@angular/core';
import { PlanillaEDService } from '../../services/PlanillaED.Service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-crear-planilla',
    templateUrl: './crear-PlanillaED.component.html',
    styleUrls: ['./crear-PlanillaED.component.css']
})
export class CrearPlanillaEDComponent implements OnInit {
    nuevoPlanillaED: any = {
        fechaCreacion: new Date(),
        efector: '',
        descripcion: '',
        servicio: ''
    };

    efectores: any[] = [];
    servicios: any[] = [];

    constructor(private _PlanillaEDService: PlanillaEDService, private router: Router) { }

    ngOnInit(): void {
        this.cargarEfectores();
        this.cargarServicios();
    }

    cargarEfectores() {
        this._PlanillaEDService.obtenerEfectores().subscribe((data: any) => {
            this.efectores = data;
        });
    }

    cargarServicios() {
        this._PlanillaEDService.obtenerServicios().subscribe((data: any) => {
            this.servicios = data;
        });
    }

    guardarPlanilla() {
        // Validar los datos antes de enviar
        if (!this.nuevoPlanillaED.descripcion || !this.nuevoPlanillaED.efector || !this.nuevoPlanillaED.servicio) {
            alert('Debe completar todos los campos obligatorios.');
            return;
        }

        // Crear el objeto a enviar
        const nuevaPlanilla = {
            descripcion: this.nuevoPlanillaED.descripcion,
            idEfector: this.nuevoPlanillaED.efector,
            idServicio: this.nuevoPlanillaED.servicio,
            fechaCreacion: this.nuevoPlanillaED.fechaCreacion // Opcional si el backend lo genera automáticamente
        };

        // Enviar los datos al servicio
        this._PlanillaEDService.guardarPlanillaED(nuevaPlanilla).subscribe({
            next: (response) => {
                console.log('Planilla guardada exitosamente:', response);
                alert('Planilla creada con éxito.');

                // Redirigir al componente para agregar ítems
                this.router.navigate(['/crear-planillaEDItems'], {
                    queryParams: {
                        id: response._id,
                        fecha: response.fechaCreacion,
                        efector: response.idEfector,
                        servicio: response.idServicio
                    }
                });
            },
            error: (error) => {
                console.error('Error al guardar la planilla:', error);
                alert('Ocurrió un error al guardar la planilla.');
            }
        });
    }

    volver() {
        this.router.navigate(['/ListarPlanillas']);
    }
}
