import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { CartService } from 'src/app/shared-services/cart.service';
import { GetProductDto } from 'src/app/shared-services/get-product-dto';
import { ProductsService } from 'src/app/shared-services/products.service';
import { environment } from 'src/environments/environment';
export interface ProductSearchFilters {
  filter: string,
};

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  searchString: string = '';
  allProducts!: GetProductDto[];
  productsFiltrates: GetProductDto[] = [];
  selectedFilter = 'Name';
  filters: ProductSearchFilters[] = [
    {filter: 'Name'},
    {filter: 'category'},
    {filter: 'Collection Name'},
    {filter: 'Materials Used'}

  ];
  public readonly baseUrl: string = environment.apiBaseUrl;
  constructor(
    private productsService: ProductsService,
    private popUpService: PopUpNotificationService,
    private router: Router,
    public cartService: CartService
  ) { }

  goToIndex() {
    return this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.cartService.calculateCartTotal();
    this.getAllProducts();
  }

  search(searchString: string) {
    if (searchString.length < 1) {
      this.productsFiltrates = this.allProducts;
    }
    else {this.searchString = searchString};

    if (this.selectedFilter == 'Category') {
      this.productsFiltrates = this.allProducts.filter(
        (product) => product.category.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    if (this.selectedFilter == 'Name') {
      this.productsFiltrates = this.allProducts.filter(
        (product) => product.name.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    if (this.selectedFilter == 'Materials Used') {
      this.productsFiltrates = this.allProducts.filter(
        (product) => product.materials.toLowerCase().includes(searchString.toLowerCase())
      );
    }

    if (this.selectedFilter == 'Collection Name') {
      this.productsFiltrates = this.allProducts.filter(
        (product) => product.collectionName.toLowerCase().includes(searchString.toLowerCase())
      );
    }
  }

  goToCart() {
    return this.router.navigate(['checkout/cart'])
  }

  viewProductDetails(product: GetProductDto) {
    this.router.navigate([`product/${product._id}`]);
  }

  getAllProducts() {
    this.productsService.getAllProducts()
      .subscribe(
        (response: ServerResponseDto) => {
          console.log(response)
          if (response.status == 'success') {
            this.allProducts = response.data;
            this.productsFiltrates = response.data;
          }
          if (response.status == 'fail') {
            this.popUpService.addNotification(response.message, 5000)
          }
        },
        (error: any) => {
          this.popUpService.addNotification(error, 5000)
        }
      )
  }

}
