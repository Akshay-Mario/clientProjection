import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { apiUrl, environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IapiProjectionModel } from '../models/apiprojeciton.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ApiProjectionService {

  constructor(private httpClient: HttpClient) { }

  //psot API call for adding data 
  postApiProjection(newData: IapiProjectionModel): Observable<string | any> {
    let URL = apiUrl + 'apiProjection';
    let isCached = false;

    if (!isCached) {
      return this.httpClient.post(URL, newData);
    }
    return of('')
  }

  public getApiProjeciton(): Observable<IapiProjectionModel[]> {
    let URL = apiUrl + 'apiProjection';
    let isCached = false;
    return this.httpClient.get<IapiProjectionModel[]>(URL);
  }
}
