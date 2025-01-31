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
        descripcion: '',
        efector: '',   // ID del efector
        servicio: ''    // ID del servicio
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
        // Verifica si los campos están completos
        if (!this.nuevoPlanillaED.descripcion || !this.nuevoPlanillaED.efector || !this.nuevoPlanillaED.servicio) {
            alert('Debe completar todos los campos obligatorios.');
            return;
        }

        // Crea el objeto para enviar al servicio
        const nuevaPlanilla = {
            descripcion: this.nuevoPlanillaED.descripcion,
            idEfector: this.nuevoPlanillaED.efector,  // Usar idEfector en lugar de efector
            idServicio: this.nuevoPlanillaED.servicio, // Usar idServicio en lugar de servicio
            fechaCreacion: this.nuevoPlanillaED.fechaCreacion
        };

        // Llama al servicio para guardar la planilla
        this._PlanillaEDService.guardarPlanillaED(nuevaPlanilla).subscribe({
            next: (response) => {
                console.log('Planilla guardada exitosamente:', response);

                // Encuentra el nombre del efector y servicio para pasar en la redirección
                const efector = this.efectores.find(e => e._id === nuevaPlanilla.idEfector);
                const servicio = this.servicios.find(s => s._id === nuevaPlanilla.idServicio);

                const efectorNombre = efector ? efector.nombre : '';
                const servicioNombre = servicio ? servicio.nombre : '';
                alert('Planilla creada con éxito.');

                // Redirige a la siguiente página con los parámetros
                this.router.navigate(['/crear-planillaEDItems'], {
                    queryParams: {
                        id: response._id,
                        descripcion: nuevaPlanilla.descripcion,
                        efector: efectorNombre, // Asignamos el nombre del efector o un string vacío
                        servicio: servicioNombre // Asignamos el nombre del servicio o un string vacío
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
