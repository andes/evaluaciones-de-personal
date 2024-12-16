import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { Server } from '@andes/shared';
import { Plex } from '@andes/plex';
import { Location } from '@angular/common';

@Component({
    selector: 'evaluaciones-de-personal-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private menuList = [];

    constructor(private server: Server, private plex: Plex) {
        this.server.setBaseURL(environment.API);
        this.plex.updateTitle('EVALUACIONES DE PERSONAL');
        this.crearMenu();
    }

    ngOnInit() {

    }

    back() {
    }

    public crearMenu() {
        this.menuList = [];
        this.menuList.push({ label: 'Parametros', icon: 'description', route: '/menucomunes' });
        this.menuList.push({ label: 'Planillas de Evaluacion', icon: 'description', route: '/menuPlanillaED' });
        this.menuList.push({ label: 'Página Principal', icon: 'description', route: '/home' });
        // this.menuList.push({ label: 'Itemasggg', icon: 'home 1', route: '/edItems' });
        // this.menuList.push({ label: 'C', icon: 'home 1', route: '/edCategoriass' });
        this.menuList.push({ label: 'Listar Categorias', icon: 'description', route: '/ListarCategoriasComponent' });
        this.menuList.push({ label: 'Listar Items', icon: 'description', route: '/ListarItems' });

        this.plex.updateMenu(this.menuList);
    }
}
