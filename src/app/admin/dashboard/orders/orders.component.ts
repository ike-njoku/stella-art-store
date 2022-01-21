import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { DeliveryAdddress } from 'src/app/shared-interfaces/create-order-dto';
import { GetProductDto } from 'src/app/shared-services/get-product-dto';
import { OrderService } from 'src/app/shared-services/order.service';
export type OrderStatus = 'shipped' | 'cancelled' | 'completed' | 'confirmed';
export interface GetOrderDTO {
  deliveryAddress: DeliveryAdddress;
  products: GetProductDto[];
  transactionReference: string,
  timeStamp: number,
  __v: number,
  _id: string,
  status: OrderStatus,
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
    private popUpService: PopUpNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  viewSingleOrder(order: GetOrderDTO) {
    this.router.navigate([`../${order._id}`], {relativeTo: this.route})
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
