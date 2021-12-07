import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
      'Authorization': 'Basic ' + 'QVE1QzRKWmlXcF9lZU5WVlJDcjNyQjdsREFDMjBWS0FXMVpZZGNudkZiTUFwUngyN1BFNUhNSnNkc2hnYXdSaTRuOFVzdDVBSnFScE9UcnQ6RVBpMzhKVm5YbDNnRkFhT2NncUg0OVU0dzU1MHkwZnc1ZHU0ZktJMXR1R3RqcG5rZVgtekgxemJFS2w0QS1RcFJGWGZKNW8zSUZrRWJaekw='
    });
    const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
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
            "value": "100.00"
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
