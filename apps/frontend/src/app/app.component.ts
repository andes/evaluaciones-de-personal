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
        this.plex.updateTitle('EVALUCIONES DE PERSONAL');
        this.crearMenu();
    }

    ngOnInit() {

    }

    back() {
    }

    public crearMenu() {
        this.menuList = [];
        this.menuList.push({ label: 'Página Principal', icon: 'home', route: '/home' });
        this.plex.updateMenu(this.menuList);
    }
}
