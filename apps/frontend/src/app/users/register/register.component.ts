import { Component } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    username: string;
    legajo: string;
    password: string;

    onRegister() {
        if (this.username && this.legajo && this.password) {
            // Lógica para registrar al usuario
            console.log('Usuario registrado:', this.username, this.legajo);
        } else {
            // Manejo de errores
            console.log('Todos los campos son obligatorios.');
        }
    }
}
