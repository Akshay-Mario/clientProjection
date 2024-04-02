import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/environments/environment';
import { IapiProjectionModel } from '../models/apiprojeciton.model';

@Injectable({
  providedIn: 'root'
})
export class ClientProjectionService {

  constructor(private http: HttpClient) { }

  public getClientProjection(): Observable<any[]> {
    let URL = apiUrl + 'clientProjection';
    let isCached = false;
    return this.http.get<any[]>(URL);
  }

  public postClientProjection(data: any): Observable<any[]> {
    let URL = apiUrl + 'clientProjection';
    let isCached = false;
    return this.http.post<any[]>(URL, data);
  }
}
