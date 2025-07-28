import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TipoEvaluacion {
    _id?: string;
    nombre: string;
    descripcion?: string;
}

@Injectable({
    providedIn: 'root',
})
export class TipoEvaluacionService {
    private apiUrl = 'http://localhost:3000/api/rmTipoEvaluacion';

    constructor(private http: HttpClient) { }

    // Obtener todos
    obtenerTipos(): Observable<TipoEvaluacion[]> {
        return this.http.get<TipoEvaluacion[]>(this.apiUrl);
    }

    // Obtener uno por ID
    obtenerTipo(id: string): Observable<TipoEvaluacion> {
        return this.http.get<TipoEvaluacion>(`${this.apiUrl}/${id}`);
    }

    // Crear nuevo
    crearTipo(tipo: TipoEvaluacion): Observable<TipoEvaluacion> {
        return this.http.post<TipoEvaluacion>(this.apiUrl, tipo);
    }

    // Actualizar uno existente
    actualizarTipo(id: string, tipo: TipoEvaluacion): Observable<TipoEvaluacion> {
        return this.http.put<TipoEvaluacion>(`${this.apiUrl}/${id}`, tipo);
    }

    // Eliminar uno por ID
    eliminarTipo(id: string): Observable<{ mensaje: string }> {
        return this.http.delete<{ mensaje: string }>(`${this.apiUrl}/${id}`);
    }
}
