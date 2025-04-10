import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }


    // Envía las credenciales (legajo y password) al endpoint de login
    login(legajo: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { legajo, password });
    }

    // Obtener todos los usuarios
    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // Obtener un usuario por ID
    getUserById(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<any>(url);
    }

    // Crear un nuevo usuario
    createUser(user: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, user);
    }

    // Actualizar un usuario existente
    updateUser(id: number, user: any): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<any>(url, user);
    }

    // Eliminar un usuario
    deleteUser(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<any>(url);
    }
}
