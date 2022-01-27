import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProductDto } from 'src/app/shared-services/get-product-dto';
import { OrderService } from 'src/app/shared-services/order.service';
import { ProductsService } from 'src/app/shared-services/products.service';
import { AuthService } from '../auth/auth.service';
import { GetOrderDTO } from './orders/orders.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allProducts: GetProductDto[] = [];
  allOrders: GetOrderDTO[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllOrders();
  }

  signOut() {
    localStorage.removeItem(this.authService.sessionStorageString);
    return this.router.navigate(['/admin/sign-in']);
  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(
        (response) => {
          this.allProducts =response.data;
        }
      )
  }

  getAllOrders() {
    this.orderService.getAllOrders()
      .subscribe(
        (response) => {
          this.allOrders = response.data;
        }
      )
  }

  navigate(url: string, options?: any) {
    if (options) {
      return this.router.navigate([url], {relativeTo: this.route})
    }
    else return this.router.navigate([url])
  }
}
