import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class PayWithPaystackService {
  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) { }

  initializePayment(email: string): Observable<any> {
    const initiationUrl = 'https://api.paystack.co/transaction/initialize';
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + 'sk_test_4c9fe6564be162a874edcdaf7bc1dc7dce4d0873'
    });

    const requestBody = {
      amount: this.cartService.cartTotal * 100,
      email: email
    };

    return this.http.post<any>(initiationUrl, requestBody, { headers: headers })
      .pipe(
        tap((response: any) => {
          this.openPaymentWindow(response.data.authorization_url)
        }),
        (catchError(this.handleError))
      )
  }

  verifyPayment(paymentRef: string): Observable<any> {
    const url = `https://api.paystack.co/transaction/verify/${paymentRef}`;
    return this.http.get<any>(url)
    .pipe(
      tap((response: any) => {
        if (response.status == true ) {
          this.openPaymentWindow(response.data.authorization_url)
         }
      }),
      (catchError(this.handleError))
    )
  }

  openPaymentWindow(url: string) {
    window.open(url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
  }

  handleError(error: any) {
    console.log(error);
    return throwError('Could not complete payment. Please check console for more details')
  }



}
