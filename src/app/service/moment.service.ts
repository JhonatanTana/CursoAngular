import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Moment } from "../Moment";
import { environment } from "../../environments/environment";
import { Response } from "../Response";

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`;
  constructor(
    private http:HttpClient
  ) {}

  getMoments(): Observable<Response<Moment[]>> { // Busca os momentos no backend
      return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  getMoment(id: number): Observable<Response<Moment>> { //Manda o id do momento para a URL
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url)
  }

  createMoment(formData:FormData): Observable<FormData> { // Cria os momentos no backend
    return  this.http.post<FormData>(this.apiUrl, formData)
  }

  removeMoment(id:number) { // Deleta o momento
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> { // Atualiza o momento
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url,formData)
  }
}
