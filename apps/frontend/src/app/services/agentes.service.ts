// src/app/servicios/agentes.service.ts

// src/app/servicios/agentes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface modAgente {
    _id?: string;  // OJO, opcional para que funcione bien la creación
    legajo: string;
    dni: string;
    nombre: string;
}

@Injectable({
    providedIn: 'root'
})
export class AgentesService {
    private apiUrl = 'http://localhost:3000/api/rAgentes';

    constructor(private http: HttpClient) { }

    obtenerTodosAgentes(): Observable<modAgente[]> {
        return this.http.get<modAgente[]>(this.apiUrl);
    }



    modificarAgente(id: string, agente: modAgente): Observable<modAgente> {
        return this.http.put<modAgente>(`${this.apiUrl}/${id}`, agente);
    }

    crearAgente(agente: modAgente): Observable<modAgente> {
        return this.http.post<modAgente>(this.apiUrl, agente);
    }

    eliminarAgente(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
