import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EntPoint } from '../entPoint';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesServiceService {

  constructor(private http: HttpClient, private baseURL: EntPoint) { }

  GET_ALL_URL = "/api/especialidad/all";
  ADD_URL = "/api/especialidad/especialidad";
  ADD_LIST_URL = "/api/especialidad/especialidad/list";
  DELETE_URL = "/api/especialidad/delete/especialidad/";
  UPDATE_URL = "/api/especialidad/update/especialidad/";

  getEspecialidadesList() {
    return this.http.get(this.GET_ALL_URL);
  }

  addEspecialidad(data: any) {
    return this.http.post(this.ADD_URL, data)
  }

  addListEspecialidades(list: Array<any>){
     return this.http.post(this.ADD_LIST_URL, list);
  }

  deleteEspecialidad(id: any) {
    return this.http.delete(`${this.DELETE_URL}/${id}`);
  }

  updateEspecialidad(id: number, data: any) {
    return this.http.put(`${this.UPDATE_URL}/${id}`, data)
  }

}
