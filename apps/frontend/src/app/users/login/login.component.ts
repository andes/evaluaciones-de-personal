// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    legajo: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    onLogin() {
        if (this.legajo && this.password) {
            this.authService.login(this.legajo, this.password).subscribe(
                response => {
                    // Supongamos que el API devuelve un token si la autenticación es correcta
                    if (response && response.token) {
                        localStorage.setItem('token', response.token);
                        // Actualiza el estado de autenticación
                        this.authService.setLoggedIn(true);
                        // Navega a la página principal del sistema (por ejemplo, dashboard)
                        this.router.navigate(['/dashboard']);
                    } else {
                        this.errorMessage = 'Legajo o contraseña incorrectos.';
                    }
                },
                error => {
                    this.errorMessage = 'Legajo o contraseña inexistente.';
                    console.error('Error de autenticación:', error);
                }
            );
        } else {
            this.errorMessage = 'Todos los campos son obligatorios.';
        }
    }
}
