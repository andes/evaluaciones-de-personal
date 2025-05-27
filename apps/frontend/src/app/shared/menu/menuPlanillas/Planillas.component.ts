
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-planilla',
    templateUrl: './Planillas.component.html',
    styleUrls: ['./Planillas.component.css']
})
export class PlanillaComponent {
    constructor(private router: Router) { }

    onPlanillaEDClick() {
        console.log('Clic en Planilla Evaluación Desempeño. Items');
        this.router.navigate(['/listar-planillaEDRouter']);
    }

    onVolverClick() {
        console.log('Clic en Volver');
        this.router.navigate(['/home']);
    }
}
