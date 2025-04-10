// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';
    // BehaviorSubject para controlar el estado de autenticación
    private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // Observable al que se pueden subscribir los componentes para saber si el usuario está autenticado
    public authStatus: Observable<boolean> = this.loggedInSubject.asObservable();
    isAuthenticated: any;

    constructor(private http: HttpClient, private router: Router) { }

    // Método para iniciar sesión (llama al API, etc.)
    login(legajo: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { legajo, password });
    }

    // Método para actualizar el estado de autenticación
    setLoggedIn(status: boolean) {
        this.loggedInSubject.next(status);
    }

    // Método para cerrar sesión (opcional)
    logout() {
        localStorage.removeItem('token');
        this.setLoggedIn(false);
        this.router.navigate(['/login']);
    }

    // Opcional: método para obtener el token
    get token(): string | null {
        return localStorage.getItem('token');
    }
}
