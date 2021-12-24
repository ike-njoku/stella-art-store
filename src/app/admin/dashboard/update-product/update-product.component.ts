import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { GetProductDto } from 'src/app/shared-services/get-product-dto';
import { ProductsService } from 'src/app/shared-services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  submitting: boolean = false;
  selectedFiles: any[] = [];
  fileReader = new FileReader();
  selectedFileData: any[] = [];
  public readonly apiBase: string = environment.apiBaseUrl;

  updateProductForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    dimensions: [null, Validators.required],
    discountPrice: [null],
    price: [null, Validators.required],
    inspiration: [null],
    description: [null, Validators.required],
    materials: [null, Validators.required],
    quantity: [null, Validators.required],
    category: [null],
    collectionName: [null],
    files: [null, Validators.required]
  });

  radioButtons = [
    {value: true},
    {value: false}
  ];

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private popUpService: PopUpNotificationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  deleteFile(file: any) {
    this.selectedProduct.files.splice(this.selectedProduct.files.indexOf(file), 1);
  }


  productId!: string;
  selectedProduct!: GetProductDto;

  getProduct() {
    const _productId = this.route.snapshot.paramMap.get('id');
    if (_productId) {
      this.productId = _productId;
      this.productService.getProductById(this.productId)
        .subscribe(
          (response: ServerResponseDto) => {
            this.selectedProduct = response.data;
            console.log(this.selectedProduct)
          },
          (error: string) => this.popUpService.addNotification(error, 5000)
        )
    }
  }

  placeProductOnSale() {
    console.log(this.selectedProduct)
  }

  selectFiles(event: any) {
    this.selectedFileData = [];
    let filesArray = Array.from(event.target.files);
    filesArray.forEach((file: any) => {
      this.selectedFiles.push(file);
      this.readFile(file);
    })
  }

  readFile(file: any) {
    let fileReader = new FileReader();
    let fileConetnt: string | ArrayBuffer | null;
    fileReader.onload = () => {
      fileConetnt = fileReader.result
      this.selectedFileData.push(fileConetnt);
    }

    fileReader.readAsDataURL(file)
  }

  updateProduct() {
    this.submitting = true;
    this.productService.updateProduct(this.selectedProduct, this.selectedFiles)
      .subscribe(
        (response: ServerResponseDto) => {
          console.log(response)
          if (response.status == 'success') {
            this.popUpService.addNotification(response.message, 5000);
            this.updateProductForm.reset();
            this.submitting = false;
          }
          else {
            this.popUpService.addNotification(response.message, 5000);
            this.submitting = false;
          }
        },
        (error: string) => {
          this.popUpService.addNotification(error, 5000)
          this.submitting = false;;
        }
      )
  }

}
