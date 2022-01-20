import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetProductDto } from 'src/app/shared-services/get-product-dto';
import { ProductsService } from 'src/app/shared-services/products.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allProducts: GetProductDto[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
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
}
