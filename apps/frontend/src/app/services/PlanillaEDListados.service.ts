import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EvaluacionCompleta {
    cabecera: any;
    detalles: any[];
}

@Injectable({
    providedIn: 'root'
})
export class EvaluacionService {

    private apiUrl = 'http://localhost:3000/api'; // Base de tu API

    constructor(private http: HttpClient) { }

    // Obtener evaluación completa por id de cabecera
    obtenerEvaluacionCompleta(idCabecera: string): Observable<EvaluacionCompleta> {
        console.log('Obteniendo evaluación completa para ID:', idCabecera);
        return this.http.get<EvaluacionCompleta>(`${this.apiUrl}/evaluacion-completa/${idCabecera}`);
    }

}
