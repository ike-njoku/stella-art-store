import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { OrderService } from 'src/app/shared-services/order.service';
import { environment } from 'src/environments/environment';
import { GetOrderDTO } from '../orders/orders.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order!: GetOrderDTO;
  public readonly apiBaseUrl = environment.apiBaseUrl;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private popUpService: PopUpNotificationService
  ) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    const id = this.route.snapshot.paramMap.get('id');
    this.orderService.getOrderById(id)
      .subscribe(
        (response) => {
          this.order = response.data;
          console.log(this.order);
        },
        (error) => {
          this.popUpService.addNotification(error, 5000)
        }
      )
  }

}
