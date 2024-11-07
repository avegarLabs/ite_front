import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EntPoint } from '../entPoint';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class UnidadFinService {

  constructor(private http: HttpClient, private baseURL: EntPoint) { }

  ADD_URL = '/api/unidad/add';
  GET_ALL_URL ='/api/unidad/all';
  UPDATE_URL = '/api/unidad/update/unidad';
  DELETE_URL = '/api/unidad/delete/unidad';
  DELETE_UNIDAD_OBRA = '/api/obraUnidad/delete/obra';
  PUT_UNIDAD_OBRA = '/api/obraUnidad/add';


  addUnidadFin(data: any) {
    return this.http.post(this.ADD_URL, data)
  }

  getUnidadFinList() {
    return this.http.get(this.GET_ALL_URL);
  }

  updateUnidadFin(id: number, data: any) {
    return this.http.put(`${this.UPDATE_URL}/${id}`, data)
  }

  deleteUnidadFin(id: any) {
    return this.http.delete(`${this.DELETE_URL}/${id}`);
  }

  deleteUnidadObra(idO: any, idUni: any){
    return this.http.delete(`${this.DELETE_UNIDAD_OBRA}/${idO}/unidad/${idUni}`);
  }

  addUnidadObra(idO: any, item: any){
    return this.http.put(`${this.PUT_UNIDAD_OBRA}/${idO}`, item);
  }


}
