import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PlanillaEDCabecera {
    _id?: string;
    fechaCreacion: Date;
    efectores: any[]; // Podés crear un modelo específico si querés más control
    descripcion: string;
    servicios: any[];
    categoria: any[];
}

@Injectable({
    providedIn: 'root'
})
export class PlanillaEDCabeceraService {

    private apiUrl = 'http://localhost:3000/api/planillaedcabecera';

    constructor(private http: HttpClient) { }

    obtenerCabeceras(): Observable<PlanillaEDCabecera[]> {
        return this.http.get<PlanillaEDCabecera[]>(this.apiUrl);
    }

    obtenerCabecera(id: string): Observable<PlanillaEDCabecera> {
        return this.http.get<PlanillaEDCabecera>(`${this.apiUrl}/${id}`);
    }



    crearCabeceraEvaluacion(cabecera: any): Observable<any> {
        return this.http.post(this.apiUrl, cabecera);
    }

    actualizarCabecera(id: string, data: PlanillaEDCabecera): Observable<any> {
        console.log('Actualizando planilla con ID:', id);
        return this.http.put(`${this.apiUrl}/${id}`, data);
    }

    eliminarCabecera(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
