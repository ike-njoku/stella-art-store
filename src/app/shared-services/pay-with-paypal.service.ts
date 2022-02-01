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
      'Authorization': 'Basic ' + 'QVptcXFlMDRVMHctMktXWEtEVS1qQkMzUW1YTnlrOUVyVDM1MXJOdFg0a0Uxamtua19RZDFKV1QzVUwtMmt6YTU1eFkyZlZ6bHFiazFLeG06RUJ0QkR2RkFYWk5MX29HQXNoWmpVTUZOcU81V3ZpTjhQUzdRcWtJZEFqQng1bHY3VGZvaVVGSHNMMjlONDQ4dzV0ZUY5SWNPMXdQZzNtOG8='
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
    const url = 'https://api-m.sandbox.paypal.com/v2/checkout/orders';
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
