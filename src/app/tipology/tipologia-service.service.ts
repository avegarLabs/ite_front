import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EntPoint } from '../entPoint';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class TipologiaServiceService {
  constructor(private http: HttpClient, private baseURL: EntPoint) { }


  GET_ALL_URL = '/api/tipologias/all';
  ADD_URL = '/api/tipologias/tipologia';
  DELETE_URL = '/api/tipologias/delete/tipologia';
  UPDATE_URL = '/api/tipologias/update/tipologia';

  TOT_ADD_URL = '/api/tipoObratipologia/add';
  TOT_DEL_URL = '/api/tipoObratipologia/delete/tipo';

  getTipologyList() {
    return this.http.get(this.GET_ALL_URL);
  }

  addTipology(data: any) {
    return this.http.post(this.ADD_URL, data)
  }

  deleteTipology(id: any) {
    return this.http.delete(`${this.DELETE_URL}/${id}`);
  }

  updateTopology(id: number, data: any) {
    return this.http.put(`${this.UPDATE_URL}/${id}`, data)
  }

  addTipoObraTipology(id: number, data: any) {
    return this.http.put(`${this.TOT_ADD_URL}/${id}`, data);
  }

  deleteTipoObraTipology(idTipoObra: number, idTipology: number) {
    console.log()
    return this.http.delete(`${this.TOT_DEL_URL}/${idTipoObra}/tipologia/${idTipology}`);
  }

}
