import { Component, OnInit } from '@angular/core';
import { PlanillaEDService } from '../../services/PlanillaED.Service';
import { Router } from '@angular/router';
import { TipoEvaluacionService, TipoEvaluacion } from '../../services/tipoevaluacion.service';

@Component({
    selector: 'app-crear-planilla',
    templateUrl: './crear-PlanillaED.component.html',
    styleUrls: ['./crear-PlanillaED.component.css']
})
export class CrearPlanillaEDComponent implements OnInit {
    tiposEvaluacion: TipoEvaluacion[] = [];
    efectores: any[] = [];
    servicios: any[] = [];

    nuevoPlanillaED: any = {
        fechaCreacion: new Date(),
        descripcion: '',
        efector: '',
        servicio: '',
        tipoEvaluacion: ''
    };

    constructor(
        private _PlanillaEDService: PlanillaEDService,
        private router: Router,
        private _tipoEvaluacionService: TipoEvaluacionService,
    ) { }

    ngOnInit(): void {
        this.cargarEfectores();
        this.cargarServicios();
        this.cargarTiposEvaluacion();
    }

    cargarTiposEvaluacion() {
        this._tipoEvaluacionService.obtenerTipos().subscribe((data: TipoEvaluacion[]) => {
            this.tiposEvaluacion = data;
        });
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
        if (
            !this.nuevoPlanillaED.descripcion ||
            !this.nuevoPlanillaED.efector ||
            !this.nuevoPlanillaED.servicio ||
            !this.nuevoPlanillaED.tipoEvaluacion
        ) {
            alert('Debe completar todos los campos obligatorios.');
            return;
        }

        const tipo = this.tiposEvaluacion.find(t => t._id === this.nuevoPlanillaED.tipoEvaluacion);

        if (!tipo) {
            alert('Tipo de evaluación no válido.');
            return;
        }

        const nuevaPlanilla = {
            descripcion: this.nuevoPlanillaED.descripcion,
            idEfector: this.nuevoPlanillaED.efector,
            idServicio: this.nuevoPlanillaED.servicio,
            fechaCreacion: this.nuevoPlanillaED.fechaCreacion,
            tipoEvaluacion: {
                idTipoEvaluacion: tipo._id,
                nombre: tipo.nombre
            }
        };

        this._PlanillaEDService.guardarPlanillaED(nuevaPlanilla).subscribe({
            next: (response) => {
                console.log('Planilla guardada exitosamente:', response);

                const efector = this.efectores.find(e => e._id === nuevaPlanilla.idEfector);
                const servicio = this.servicios.find(s => s._id === nuevaPlanilla.idServicio);

                const efectorNombre = efector ? efector.nombre : '';
                const servicioNombre = servicio ? servicio.nombre : '';
                alert('Planilla creada con éxito.');

                this.router.navigate(['/crear-planillaEDItems'], {
                    queryParams: {
                        id: response._id,
                        descripcion: nuevaPlanilla.descripcion,
                        efector: efectorNombre,
                        servicio: servicioNombre
                    }
                });
            },
            error: (error) => {
                console.error('Error al guardar la planilla:', error);
                alert('Ocurrió un error al guardar la planilla.');
            }
        });
    }

    public onPlanillaEDClick(): void {
        this.router.navigate(['/listar-planillaEDRouter']);
    }

    volver() {
        this.router.navigate(['/ListarPlanillas']);
    }
}
