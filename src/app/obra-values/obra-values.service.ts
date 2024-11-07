import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { EntPoint } from '../entPoint';

// Set the http options
const httpOptions = {
  headers: new HttpHeaders({"Content-Type": "application/json"})
};

@Injectable({
  providedIn: 'root'
})
export class ObraValuesService {

constructor(private http: HttpClient, private baseURL: EntPoint) { }
POST_URL = '/api/valores/add';

  addObraValues(data: any){
    return this.http.post(this.POST_URL, data);
  }

}
