import { Component, OnInit } from '@angular/core';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { DeliveryAdddress } from 'src/app/shared-interfaces/create-order-dto';
import { GetProductDto } from 'src/app/shared-services/get-product-dto';
import { OrderService } from 'src/app/shared-services/order.service';

export interface GetOrderDTO {
  deliveryAddress: DeliveryAdddress;
  products: GetProductDto[];
  transactionReference: string,
  timeStamp: number,
  __v: number,
  _id: string,
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  allOrders: GetOrderDTO[] = [];
  constructor(
    private ordersService: OrderService,
    private popUpService: PopUpNotificationService
  ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.ordersService.getAllOrders()
      .subscribe(
        (response) => {
          if (response.status =='success') {
            console.log(response.data);
            this.allOrders = response.data;
          }
          else this.popUpService.addNotification(response.message, 5000);
        },
        (error) => {
          this.popUpService.addNotification('An Error Occured, please check console',  5000)
        }
      )
  }

}
