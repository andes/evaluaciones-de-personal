import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { modItems } from '../modelos/items.model';
import { map } from 'rxjs/operators';

export interface Items {
    _id?: string;
    descripcion: string;
    valor: number;
}

@Injectable({
    providedIn: 'root'
})

export class ItemsService {
    //apiurl buscarla



    private apiUrl = 'http://localhost:3000/api/rmItems';
    private apiUrlS = 'http://localhost:3000/api/rItems';


    constructor(private http: HttpClient) { }

    obtenerItemss(): Observable<Items[]> {
        return this.http.get<Items[]>(this.apiUrl);
    }

    getItems(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    eliminarItems(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);


    }

    guardarItems(items: Items): Observable<any> {
        console.log('Datos enviados al API:', items);
        return this.http.post(this.apiUrl, items);
    }


    obtenerItems(id: string): Observable<any> {

        return this.http.get<Items>(`${this.apiUrl}/${id}`);
    }

    actualizarItems(_id: string, items: Items): Observable<any> {
        console.log('Actualizando item con ID:', _id);  // Verifica si el _id se pasa correctamente
        console.log('Datos del item a actualizar:', items);  // Verifica los datos que se están enviando

        return this.http.put(`${this.apiUrlS}/${_id}`, items);
    }

}
