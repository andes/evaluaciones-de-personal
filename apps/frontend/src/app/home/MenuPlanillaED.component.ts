import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-menucomunes',
    templateUrl: './MenuPlanillaED.component.html',
    styleUrls: ['./MenuPlanillaED.component.css'],
    encapsulation: ViewEncapsulation.None, // 

})
export class MenuPlanillaEDComponent {

    constructor(private router: Router) { }

    public onPlanillaEDClick(): void {
        this.router.navigate(['/listar-planillaEDRouter']);
    }
}


