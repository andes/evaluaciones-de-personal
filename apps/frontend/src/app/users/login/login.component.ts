
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    dni: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    onLogin() {
        if (this.dni && this.password) {
            this.authService.login(this.dni, this.password).subscribe({
                next: (response) => {
                    if (response && response.token) {
                        this.authService.guardarToken(response.token);


                        if (response.user) {
                            localStorage.setItem('user', JSON.stringify(response.user));
                            console.log('Datos del usuario:', response.user);
                        }

                        this.router.navigate(['/home']);
                    } else {
                        this.errorMessage = 'DNI o contraseña incorrectos.';
                    }
                },
                error: (error) => {
                    this.errorMessage = 'DNI o contraseña inexistente.';
                    console.error('Error de autenticación:', error);
                }
            });
        } else {
            this.errorMessage = 'Todos los campos son obligatorios.';
        }
    }


}
