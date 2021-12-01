import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { CartService } from 'src/app/shared-services/cart.service';
import { GetProductDto } from 'src/app/shared-services/get-product-dto';
import { ProductsService } from 'src/app/shared-services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: GetProductDto;
  currentFileIndex: number = 0;
  public readonly baseUrl = environment.apiBaseUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private popUp: PopUpNotificationService,
    public cartService: CartService
  ) { }
  goToShop() {
    return this.router.navigate(['shop'])
  }

  goToCart() {
    return this.router.navigate(['checkout/cart'])
  }

  ngOnInit(): void {
    this.cartService.calculateCartTotal();
    this.getProductById();
  }

  getProductById() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId == null) {
      this.popUp.addNotification('This product does not exist, or may have been removed', 5000);
      this.router.navigate(['shop'])
    }
    else

      this.productService.getProductById(productId)
        .subscribe(
          (response: ServerResponseDto) => {
            this.product = response.data;
            console.log(this.product)
          },
          (error: string) => this.popUp.addNotification(error, 500)
        )
  }

  jumpToFile(file: any) {
    this.currentFileIndex = this.product.files.indexOf(file);
  }

  addToCart() {
    this.cartService.addProductToCart(this.product)
  }
}
