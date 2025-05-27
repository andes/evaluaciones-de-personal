// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    nombre?: string;
    rol?: string;
    idefector?: string;
    idservicio?: string;

}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/api';
    private tokenKey = 'token';
    private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public authStatus: Observable<boolean> = this.loggedInSubject.asObservable();

    private usuario: {
        nombre?: string;
        rol?: string;
        idefector?: string;
        idservicio?: string;
    } = {};

    constructor(private http: HttpClient, private router: Router) {
        this.setLoggedIn(!!this.token);
        this.decodeStoredToken();
    }

    login(dni: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { dni, password });
    }

    guardarToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
        this.decodeToken(token);
        this.setLoggedIn(true);
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        this.usuario = {};
        this.setLoggedIn(false);
        this.router.navigate(['/login']);
    }

    get token(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    get isAuthenticated(): boolean {
        return !!this.token;
    }

    setLoggedIn(status: boolean) {
        this.loggedInSubject.next(status);
    }
    private decodeToken(token: string) {
        try {
            const decoded = jwtDecode(token) as DecodedToken;

            this.usuario = {
                nombre: decoded.nombre,
                rol: decoded.rol,
                idefector: decoded.idefector,
                idservicio: decoded.idservicio
            };
        } catch (error) {
            console.error('❌ Error al decodificar el token:', error);
            this.usuario = {};
        }
    }


    private decodeStoredToken() {
        const token = this.token;
        if (token) {
            this.decodeToken(token);
        }
    }


    getNombre(): string {
        return this.usuario.nombre || '';
    }

    getRol(): string {
        return this.usuario.rol || '';
    }

    getEfector(): string {
        return this.usuario.idefector || '';
    }

    getServicio(): string {
        return this.usuario.idservicio || '';
    }
}
