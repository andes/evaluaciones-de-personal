import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menucomunes',
    templateUrl: './menucomunes.component.html',
    styleUrls: ['./menucomunes.component.css']
})
export class MenuComunesComponent {

    constructor(private router: Router) { }

    public onCategoriasClick(): void {
        this.router.navigate(['/ListarCategoriasComponent']);
    }
}

