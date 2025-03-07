import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-menu-comunes',
    templateUrl: './sharedmenuComunes.component.html',
    styleUrls: ['./sharedmenuComunes.component.css']
})
export class sharedMenuComunesComponent {
    // Permite configurar el título desde el componente padre
    @Input() tituloMenu: string = 'PLANILLA DE EVALUACIÓN';

    // Eventos para notificar acciones al componente que usa el menú
    @Output() planillaEDClick = new EventEmitter<void>();
    @Output() volverClick = new EventEmitter<void>();

    // Método invocado al hacer click en el botón de planilla
    accionPlanillaEDClick() {
        this.planillaEDClick.emit();
    }

    // Método invocado al hacer click en el botón "Volver"
    accionVolverClick() {
        this.volverClick.emit();
    }
}
