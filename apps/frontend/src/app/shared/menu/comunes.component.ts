
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-comunes',
    templateUrl: './comunes.component.html',
    styleUrls: ['./comunes.component.css']
})
export class ComunesComponent {

    constructor(private router: Router) { }

    onPlanillaEDClick() {
        console.log('Clic en Planilla Evaluación Desempeño. Items');
        // this.router.navigate(['/listar-planillaEDRouter']);
    }

    onTipoEvaluacion() {
        console.log('Clic en Tipo Evaluación');
        this.router.navigate(['/tipo-evaluacion']);

    }


    onServiciosClick() {

        console.log('Clic en Planilla Evaluación Desempeño. Agentes');

    }

    onAgentesClick() {

        console.log('Clic en Volver');
        this.router.navigate(['/home']);
    }
}