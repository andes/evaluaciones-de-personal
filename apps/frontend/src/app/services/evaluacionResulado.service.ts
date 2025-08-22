import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    totalItems?: number;
    sumaPuntajes?: number;
    cantidad?: number;
    promedio?: number;



}

@Injectable({
    providedIn: 'root'
})
export class EvaluacionResultadosService {

    private baseUrl = 'http://localhost:3000/api/evaluacionItems';

    constructor(private http: HttpClient) { }

    // 1) Contar total de items para idPlanillaEvaluacionCabecera
    contarItems(idPlanillaEvaluacionCabecera: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.baseUrl}/contar-items/${idPlanillaEvaluacionCabecera}`);
    }

    // 2) Contar items con puntaje > 0
    contarItemsConValor(idPlanillaEvaluacionCabecera: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.baseUrl}/contar-items-valor/${idPlanillaEvaluacionCabecera}`);
    }

    // 3) Sumar y promediar puntajes > 0
    sumaPromediaPuntajes(idPlanillaEvaluacionCabecera: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.baseUrl}/sumaPromediaPuntajes/${idPlanillaEvaluacionCabecera}`);
    }
}
