import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface GetPayPalAuthToken {
  access_token: string,
  app_id: string,
  expires_in: number,
  nonce: string,
  scope: string
  token_type: "Bearer"
};

export interface payPalLink {
  href: string,
  method: 'GET' | 'POST' | 'PATCH',
  rel: 'self' | 'approve' | 'capture'
}

export interface GetPayPalPaymentLink {
  id: string,
  links: payPalLink[],
  status: "CREATED"
};

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
    const url = environment.authTokenUrl;
    return this.http.post<any>(url, body, {
      headers: headers
    })
      .pipe(
        catchError(this.handleError)
      )
  }

  openPaymentWindow(authToken: string): Observable<any> {
    console.log('opening payment window');
    console.log('authorization token '+ authToken);
    const paymentParams = {
      "intent": "CAPTURE",
      "purchase_units": [
        {
          "amount": {
            "currency_code": "USD",
            "value": "100.00"
          }
        }
      ]
    };

    let header = new HttpHeaders({
      'Authorization': 'Bearer ' + authToken
    });

    const url = environment.payUrl;
    return this.http.post<any>(url, paymentParams, {headers: header})
    .pipe(
      tap((response: any) => {
        console.log(response)
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: any) {
    console.log(error)
    return throwError('Can not Make payment. Please try again')
  }
}
