import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PlanillaEDDetalleService {
    private baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    crearEvaluacionDetalle(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/evaluaciondetalle`, data);
    }

    obtenerEvaluacionDetallePorId(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/evaluaciondetalle/${id}`);
    }

    actualizarEvaluacionDetalle(id: string, data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/evaluaciondetalle/${id}`, data);
    }

    eliminarEvaluacionDetallePorId(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/evaluaciondetalle/${id}`);
    }

    eliminarTodasLasEvaluaciones(): Observable<any> {
        return this.http.delete(`${this.baseUrl}/evaluaciondetalle`);
    }
    //corrige id items en la evaluacion
    corregirItemsPorDescripcion(idEvaluacion: string) {
        return this.http.put(`${this.baseUrl}/evaluaciondetalle/corregir-items/${idEvaluacion}`, {});
    }


}
