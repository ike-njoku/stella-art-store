import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared-services/cart.service';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent implements OnInit {
  transactionReference!: string;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTransactionReference();
  }

  clearCart() {

  }

  getTransactionReference() {
    this.route.queryParams
      .subscribe((params) => {
        this.transactionReference = params.reference;
      })
  }

  goToShop() {
    return this.router.navigate(['shop'])
  }

  goToIndex() {
    return this.router.navigate([''])
  }

}
