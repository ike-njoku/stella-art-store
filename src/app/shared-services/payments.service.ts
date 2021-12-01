import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface FlutterwavePaymentPayLoad {
  "tx_ref": string,
  "amount": string,
  "currency": string,
  "redirect_url": string,
  "payment_options": string,
  "meta": {
    "consumer_id": string | number,
    "consumer_mac": string
  },
  "customer": {
    "email": string,
    "phonenumber": string,
    "name": string
  },
  "customizations": {
    "title": string,
    "description": string,
    "logo": string
  }
}

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient
  ) { }

  payWithFlutterwave(payLoad: FlutterwavePaymentPayLoad): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+'FLWSECK_TEST-055c56113ab64c4adfea6bf4b9a04eb8-X' });
  let options = { headers: headers };
    const url = 'https://api.flutterwave.com/v3/payments';
    return this.http.post<any>(url, payLoad, options)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error: any) {
    console.log(error);
    return throwError('Could not process payment. Please check console for details')
  }
}
