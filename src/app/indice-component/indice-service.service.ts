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
export class IndiceServiceService {

    constructor(private http: HttpClient, private baseURL: EntPoint) { }

    GET_ALL_URL = '/api/indices/all';
    POST_URL = '/api/indices/indice';
    DELETE_URL = '/api/indices/delete/indice';
    GET_LIST_INDEX_URL = '/api/indices/detail';

    getAllIndicesList() {
        return this.http.get(this.GET_ALL_URL);
    }

    getSingleIndice(id: any, estado: any) {
        return this.http.get(`${this.GET_LIST_INDEX_URL}/${id}/${estado}`)
    }

    deleteIndice(id: any) {
        return this.http.delete(`${this.DELETE_URL}/${id}`);
    }

    addIndice(data: any) {
        return this.http.post(this.POST_URL, data)
    }


}
