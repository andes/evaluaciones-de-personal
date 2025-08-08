import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemsR {
    _id?: string;
    descripcion: string;
    valor: number;
}

@Injectable({
    providedIn: 'root'
})
export class ItemsRService {
    private apiUrl = 'http://localhost:3000/api/itemsR';


    constructor(private http: HttpClient) { }

    // Obtener todos los ítems
    getItemsR(): Observable<ItemsR[]> {
        return this.http.get<ItemsR[]>(this.apiUrl);
    }

    // Obtener un ítem por ID
    getItemRById(id: string): Observable<ItemsR> {
        return this.http.get<ItemsR>(`${this.apiUrl}/${id}`);
    }

    // Crear un nuevo ítem
    createItemR(item: ItemsR): Observable<ItemsR> {
        return this.http.post<ItemsR>(this.apiUrl, item);
    }

    // Actualizar un ítem existente
    updateItemR(id: string, item: ItemsR): Observable<ItemsR> {
        return this.http.put<ItemsR>(`${this.apiUrl}/${id}`, item);
    }

    // Eliminar un ítem
    deleteItemR(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
