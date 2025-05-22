import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Plex } from '@andes/plex';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    titulo: string = 'Evaluación de Desempeño';
    nombreUsuario: string = '';
    rol: string = '';
    idefector: string = '';
    idservicio: string = '';

    public menuList: any[] = [];
    public animationClass: string = 'start-home';

    constructor(private authService: AuthService, private plex: Plex) {
        this.nombreUsuario = this.authService.getNombre();
        this.rol = this.authService.getRol();
        this.idefector = this.authService.getEfector();
        this.idservicio = this.authService.getServicio();
    }

    ngOnInit(): void {
        this.crearMenu();
    }

    crearMenu(): void {
        this.menuList = [
            { label: 'Parametros', route: '/menucomunes', anim: 'start-home' },
            { label: 'Planillas', route: '/listar-planillaEDRouter', anim: 'start-about' },
            { label: 'Evaluacion', route: '/home', anim: 'start-blog' },
            { label: 'Categorias', route: '/ListarCategoriasComponent', anim: 'start-portefolio' },
            { label: 'Items', route: '/ListarItems', anim: 'start-contact' }
        ];
        this.plex.updateMenu(this.menuList);
    }

    setAnimation(anim: string): void {
        this.animationClass = anim;
    }
}
