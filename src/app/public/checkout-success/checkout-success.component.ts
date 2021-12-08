import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { CreateOrderDTO } from 'src/app/shared-interfaces/create-order-dto';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { CartService } from 'src/app/shared-services/cart.service';
import { OrderService } from 'src/app/shared-services/order.service';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent implements OnInit {
  transactionReference: string = '';

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private orderService: OrderService,
    private popUpService: PopUpNotificationService
  ) { }

  ngOnInit(): void {
    this.getTransactionReference();
    this.cartService.postOrder();
    this.sendOrder();
  }

  getTransactionReference() {
    this.route.queryParams
      .subscribe((params) => {
        this.transactionReference = params.reference;
      })
  }

  sendOrder() {
    this.orderService.getDeliveryAddress();
    let order: CreateOrderDTO = {
      transactionReference: this.transactionReference,
      deliveryAddress: JSON.parse(this.orderService.getDeliveryAddress()),
      products: this.cartService.productsInCart
    }

    this.orderService.createOrder(order)
      .subscribe(
        (response: ServerResponseDto) => {
          this.popUpService.addNotification(response.message, 5000);
          if (response.status == 'success') {
            localStorage.clear();
          }
        },
        (error: string) => this.popUpService.addNotification(error)
      )

  }

  goToShop() {
    return this.router.navigate(['shop'])
  }

  goToIndex() {
    return this.router.navigate([''])
  }

}
