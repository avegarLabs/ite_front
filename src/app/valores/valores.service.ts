import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { EntPoint } from '../entPoint';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class ValoresService {
  constructor(private http: HttpClient, private baseURL: EntPoint) { }
  GET_VALORES_URL = '/api/valores/obra';
  DELETE_URL = '/api/valores/delete';
  GET_VALOR_URL = '/api/valores/valor';
  UPDATE_URL = '/api/valores/update';
  POST_VALORES_URL = '/api/valores/add';
  DELETE_VALOR_ESPECIALIDAD = '/api/valoresEspecialidad/delete/valor';
  PUT_VALOR_ESPECIALIDAD = '/api/valoresEspecialidad/add';

  getValoresByObra(id: any){
    return this.http.get(`${this.GET_VALORES_URL}/${id}`);
  }

  deleteValor(id: any){
    return this.http.delete(`${this.DELETE_URL}/${id}`);
  }

  getDetailValor(id: any){
       return this.http.get(`${this.GET_VALOR_URL}/${id}`);
  }

  updateValor(id: number, data: any) {
    return this.http.put(`${this.UPDATE_URL}/${id}`, data)
  }

  addValor(item: any){
    return this.http.post(this.POST_VALORES_URL, item);
  }

  deleteValorEspecialidad(idV: any, idEsp: any){
    return this.http.delete(`${this.DELETE_VALOR_ESPECIALIDAD}/${idV}/especialidad/${idEsp}`);
  }

  addValorEspecialidad(idV: any, item: any){
    return this.http.put(`${this.PUT_VALOR_ESPECIALIDAD}/${idV}`, item);
  }

}
