import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface getStateDTO {
  name: string,
  state_code: string
}

export interface getCountriesDTO {
  name: string,
  iso3: string,
  states: getStateDTO[]
}

@Injectable({
  providedIn: 'root'
})
export class AddressHelperService {
  selectedCountry: any;
  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<any> {
    const url = 'https://countriesnow.space/api/v0.1/countries/states';
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleErrors)
      )
  }

  getCountryDialCode(payLoad: any): Observable<any> {
    const url = 'https://countriesnow.space/api/v0.1/countries/codes';
    return this.http.post<any>(url,payLoad )
      .pipe(
        catchError(this.handleErrors)
      )
  }

  getCities(payLoad: any) {
    const url = 'https://countriesnow.space/api/v0.1/countries/state/cities';
    return this.http.post<any>(url, payLoad)
      .pipe(
        catchError(this.handleErrors)
      )
  }

  handleErrors(error: any) {
    console.log(error);
    return throwError('Cannot get Locations. Please check console for more details');
  }
}
