// src/app/servicios/agentes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { modAgente } from '../modelos/agentes..models';

@Injectable({
    providedIn: 'root'
})
export class AgentesService {

    private apiUrl = 'http://localhost:3000/api/rAgentes';

    constructor(private http: HttpClient) { }

    obtenerTodosAgentes(): Observable<modAgente[]> {
        return this.http.get<modAgente[]>(this.apiUrl);
    }


}
