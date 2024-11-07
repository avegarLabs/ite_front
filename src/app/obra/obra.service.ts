import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EntPoint } from '../entPoint';

// Set the http options
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  constructor(private http: HttpClient, private baseURL: EntPoint) {
  }

  GET_ALL_URL = '/api/obras/all';
  POST_URL = '/api/obras/obra';
  DELETE_URL = '/api/obras/delete/obra';
  PUT_UPDATE_URL = '/api/obras/update/obra';
  GET_SINGLE_URL = '/api/obras/detail';

  getAllObras() {
    return this.http.get(this.GET_ALL_URL);
  }

  deleteObra(id: any) {
    return this.http.delete(`${this.DELETE_URL}/${id}`);
  }

  getObraById(id: any ){
    return this.http.get(`${this.GET_SINGLE_URL}/${id}`)
  }

  addObra(data: any){
    return this.http.post(this.POST_URL, data)
  }

  updateObra(id: any, data: any) {
    return this.http.put(`${this.PUT_UPDATE_URL}/${id}`, data)
  }

}
