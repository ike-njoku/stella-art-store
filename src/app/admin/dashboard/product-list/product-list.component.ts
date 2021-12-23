import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { GetProductDto } from 'src/app/shared-services/get-product-dto';
import { ProductsService } from 'src/app/shared-services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  allProducts: GetProductDto[] = [];
  selectedProduct!: GetProductDto;
  public readonly apiBase: string = environment.apiBaseUrl;

  constructor(
    private productService: ProductsService,
    private popUpService: PopUpNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  goToUpdateRoute(product: GetProductDto) {
    this.router.navigate(['../','update', product._id], {relativeTo: this.route});
  }

  getAllProducts() {
    this.productService.getAllProducts()
      .subscribe(
        (response: ServerResponseDto) => this.allProducts = response.data,
        (error: any) => this.popUpService.addNotification(error, 5000)
      )
  }

  toggleModal(modalId: string) {
    document.getElementById(modalId)?.classList.toggle('active');
    document.getElementById('main')?.classList.toggle('blur')
  }

  selectProduct(product: GetProductDto) {
    this.selectedProduct = product;
  }

  deleteProduct(product: GetProductDto) {
    this.productService.deleteProduct(product)
      .subscribe(
        (response: ServerResponseDto) => {
          console.log(response);
          this.popUpService.addNotification(response.message, 5000);
          if (response.status == 'success') {
            this.toggleModal('delete-modal');
            this.allProducts.splice(this.allProducts.indexOf(product), 1);
          }
        },
        (error: string) => this.popUpService.addNotification(error, 5000)
      )
  }
}
