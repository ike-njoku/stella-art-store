import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { CartService } from 'src/app/shared-services/cart.service';
import { GetProductDto } from 'src/app/shared-services/get-product-dto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public readonly baseUrl: string = environment.apiBaseUrl;
  constructor(
    public cartService: CartService,
    private popUpService: PopUpNotificationService,
    private router: Router
  ) { }

  checkOut() {
    if (this.cartService.cartTotal ==  0 || this.cartService.productsInCart.length < 1) {
      this.popUpService.addNotification('You have no products in your cart', 5000);
      return;
    }
    else {
      this.router.navigate(['checkout/address'])
    }
  }

  goToShop() {
    this.router.navigate(['/shop'])
  }

  ngOnInit(): void {
    this.cartService.calculateCartTotal();
  }
}
