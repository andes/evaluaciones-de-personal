import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { Server } from '@andes/shared';
import { Plex } from '@andes/plex';
import { AuthService } from './auth.service';

@Component({
    selector: 'evaluaciones-de-personal-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    menuList = [];
    isLoggedIn: boolean = false;

    constructor(
        private server: Server,
        private plex: Plex,
        private authService: AuthService
    ) {
        this.server.setBaseURL(environment.API);
        this.plex.updateTitle('EVALUACIONES DE PERSONAL');

        // Se suscribe al estado de autenticación
        this.authService.authStatus.subscribe(status => {
            this.isLoggedIn = status;
            if (status) {
                this.crearMenu();
            }
        });
    }

    ngOnInit() { }

    public crearMenu() {
        this.menuList = [];
        this.menuList.push({ label: 'Parametros', icon: 'description', route: '/menucomunes' });
        this.menuList.push({ label: 'Planillas de Evaluacion', icon: 'description', route: '/listar-planillaEDRouter' });
        this.menuList.push({ label: 'Página Principal', icon: 'description', route: '/home' });
        this.menuList.push({ label: 'Listar Categorias', icon: 'description', route: '/ListarCategoriasComponent' });
        this.menuList.push({ label: 'Listar Items', icon: 'description', route: '/ListarItems' });

        this.plex.updateMenu(this.menuList);
    }
}
