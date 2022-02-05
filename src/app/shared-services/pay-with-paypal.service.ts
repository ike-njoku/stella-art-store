import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayWithPaypalService {

  constructor(
    private http: HttpClient
  ) { }

  getAuthToken(): Observable<any> {
    let body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + environment.paypalParams
    });
    const url = environment.paypalUrl;
    return this.http.post<any>(url, body, {
      headers: headers
    })
      .pipe(
        catchError(this.handleError)
      )
  }

  makePayment(authorizationString: string): Observable<any> {
    const paymentDetails = {
      "intent": "CAPTURE",
      "purchase_units": [
        {
          "amount": {
            "currency_code": "USD",
            "value": "1.00"
          }
        }
      ]
    }
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ authorizationString
    });
    const url = environment.paypalUrl;
    console.log(authorizationString);
    return this.http.post<any>(url, paymentDetails, {headers: headers})
      .pipe(
        (catchError(this.handleError))
      )
  }

  private handleError(error: any) {
    console.log(error)
    return throwError('Can not Make payment. Please try again')
  }
}
