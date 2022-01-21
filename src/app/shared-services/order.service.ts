import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateOrderDTO, DeliveryAdddress } from '../shared-interfaces/create-order-dto';
import { ServerResponseDto } from '../shared-interfaces/server-response-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public readonly deliveryAddressStorageString = '9nxkyb.-09-12cBNK?Llp';

  constructor(
    private http: HttpClient
  ) { }

  storeDeliveryAddress(address: DeliveryAdddress) {
    return localStorage.setItem(this.deliveryAddressStorageString, JSON.stringify(address));
  }

  getDeliveryAddress(): string {
    let deliveryAddress = localStorage.getItem(this.deliveryAddressStorageString);
    if (deliveryAddress) {
      return deliveryAddress
    }
    else return '';
  }

  createOrder(order: CreateOrderDTO): Observable<ServerResponseDto> {
    const subUrl = 'orders/create'
    const url = `${environment.apiBaseUrl}/${subUrl}`;

    return this.http.post<ServerResponseDto>(url, order)
      .pipe(
        (catchError(this.handleError))
      )
  }

  getAllOrders(): Observable<ServerResponseDto> {
    const subUrl = 'orders'
    return this.http.get<ServerResponseDto>(`${environment.apiBaseUrl}/${subUrl}`)
      .pipe(
        (catchError(this.handleError))
      )
  }

  handleError(error: any) {
    console.log(error);
    return throwError('Could not post your order')
  }
}
