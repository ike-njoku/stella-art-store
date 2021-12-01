import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../admin/auth/auth.service';
import { PopUpNotificationService } from '../pop-up-notification/pop-up-notification.service';
import { GetProductDto } from './get-product-dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsInCart: GetProductDto[] = [];
  cartTotal: number = 0;

  constructor(
    private popUpService: PopUpNotificationService,
    private authService: AuthService,
  ) { }

  checkIfProductIsInCart(product: GetProductDto): boolean {
    let _product = JSON.stringify(product);
    let productsInCart: string[] = Object.keys(localStorage);
    if (productsInCart.includes(_product)) return true;
    else return false;
  }

  addProductToCart(product: GetProductDto): any {
    if (this.checkIfProductIsInCart(product)) {
      return this.popUpService.addNotification(`${product.name} is already in your cart`, 5000);
    }

    let _product = JSON.stringify(product);
    localStorage.setItem(_product, _product);
    this.calculateCartTotal();
    this.popUpService.addNotification(`Added ${product.name} to cart`, 5000)
  }

  removeProductFromCart(product: GetProductDto) {
    // clear products in cart
    this.productsInCart = [];
    let _product = JSON.stringify(product)
    localStorage.removeItem(_product);
    // clear the cart total
    this.cartTotal = 0;
    this.calculateCartTotal();
  }

  calculateCartTotal() {
    // clear products in cart
    this.productsInCart = [];
    this.cartTotal = 0;
    let _localStoreage: string[] = Object.keys(localStorage);
    _localStoreage.forEach((item) => {
      if (item !== this.authService.sessionStorageString) {
        let _product = JSON.parse(item);
        this.productsInCart.push(_product)
      }
    });

    this.productsInCart.forEach((product) => {
      if (product.isOnSale == true) {
        this.cartTotal += product.discountPrice
      }
      else this.cartTotal += product.price
    })
  }
}
