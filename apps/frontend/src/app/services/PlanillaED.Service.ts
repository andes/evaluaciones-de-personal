import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface IPlanillaED extends Document {
    fechaCreacion: Date;
    idEfector: string;  // ID de tipo string, que corresponde a un ObjectId de Mongoose
    descripcion: string;
    idServicio: string;  // ID de tipo string, que corresponde a un ObjectId de Mongoose
}

@Injectable({
    providedIn: 'root'
})
export class PlanillaEDService {
    private baseUrl = 'http://localhost:3000/api'; // Cambia según la URL de tu backend

    constructor(private http: HttpClient) { }

    getPlanillasED(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/planillasED`);
    }

    obtenerEfectores(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/api/rmEfectores');
    }

    obtenerServicios(): Observable<any[]> {
        return this.http.get<any[]>('http://localhost:3000/api/rmServicios');
    }




    obtenerCategorias(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/categorias`);
    }

    guardarPlanillaED(planilla: any): Observable<any> {
        if (!planilla.descripcion || !planilla.idEfector || !planilla.idServicio) {
            console.error('Campos obligatorios faltantes:', planilla);
            return throwError('Campos obligatorios faltantes');
        }
        return this.http.post(`${this.baseUrl}/planillasED`, planilla).pipe(
            catchError((error) => {
                console.error('Error al guardar la planilla:', error);
                return throwError(error);
            })
        );
    }





}
