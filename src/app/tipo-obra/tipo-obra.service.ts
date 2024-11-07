import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EntPoint } from '../entPoint';

@Injectable({
  providedIn: 'root'
})
export class TipoObraService {

  GET_ALL_URL ='/api/tipoobra/all';
  POST_URL = '/api/tipoobra/tipoobra';
  DELETE_URL = '/api/tipoobra/delete/tipoobra';
  PUT_UPDATE_URL = '/api/tipoobra/update/tipoobra';
  GET_TIPOLOGY_LIST_URL = '/api/tipoObratipologia/tipologia';

  constructor(private http: HttpClient, private baseURL: EntPoint) { }

  getAllTipoObra() {
    return this.http.get(this.GET_ALL_URL);
  }

  deleteTipoObra(id: any) {
    return this.http.delete(`${this.DELETE_URL}/${id}`);
  }

  addTipoObra(data: any){
    return this.http.post(this.POST_URL, data)
  }

  updateTipoObra(id: any, data: any) {
    return this.http.put(`${this.PUT_UPDATE_URL}/${id}`, data)
  }

  getObraTipologyList(id: number) {
    console.log("Data", id)
    return this.http.get(`${this.GET_TIPOLOGY_LIST_URL}/${id}`);
  }
}
