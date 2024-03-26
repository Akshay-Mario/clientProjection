import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YearService {

  constructor(private httpClient: HttpClient) {
   }

   //psot API call for adding data 
  getYearData(): Observable<string | any> {
    let URL = apiUrl + 'year/yearData';
      return this.httpClient.get(URL);
  }

  putYearData(data: Number[]):Observable<any> {
    let URL = apiUrl + 'year/yearData';
    return this.httpClient.put(URL,data);
  }

}
