import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { modCategoria } from '../modelos/categoria.model';
import { map } from 'rxjs/operators';

export interface Categoria {
    _id: string;
    descripcion: string;
}

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
    //apiurl buscarla

    // private apiUrl = 'http://localhost:3000/api/rmCategoriaItems';
    private apiUrl = 'http://localhost:3000/api/rmCategoriaItems';

    private apiUrlPost = 'http://localhost:3000/api/rCategoriaItems';


    constructor(private http: HttpClient) { }

    obtenerCategoriasOrdenadas(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(this.apiUrl).pipe(
            map(categorias => categorias.sort((a, b) => a.descripcion.localeCompare(b.descripcion)))
        );
    }


    getCategoria(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    //  getCategory(descripcion: string): Observable<modCategoria> {
    //      return this.http.get<modCategoria>(`${this.apiUrl}/${descripcion}`);
    //  }

    eliminarCategoria(id: string): Observable<any> {
        return this.http.delete(this.apiUrl + id);


    }

    guardarCategoria(categoria: Categoria): Observable<any> {
        return this.http.post(this.apiUrlPost, categoria);
    }




    obtenerCategoria(id: string): Observable<any> {

        return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
    }

    actualizarCategoria(_id: string, categoria: Categoria): Observable<any> {
        return this.http.put(`${this.apiUrlPost}/${_id}`, categoria);
    }


    // verificarDescripcionUnica(descripcion: string): Observable<boolean> {
    //    return this.http.get<any[]>(`${this.apiUrl}/verificar-descripcion/${descripcion}`)
    //        .pipe(
    //            map((categorias: any[]) => {
    //                return categorias.length === 0; // Retorna true si no hay categorías con esa descripción
    //            })
    //        );
    //}

    verificarDescripcionUnica(descripcion: string): Observable<boolean> {
        console.log('Verificando en la API la descripción:', descripcion); // Log para ver la solicitud

        return this.http.get<any[]>(`${this.apiUrl}/verificar-descripcion/${descripcion}`)
            .pipe(
                map((categorias: any[]) => {
                    console.log('Respuesta de la API:', categorias); // Log para ver la respuesta de la API
                    return categorias.length === 0; // Retorna true si no hay categorías con esa descripción
                })
            );
    }





}
