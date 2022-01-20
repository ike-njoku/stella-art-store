import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { GetProductDto } from 'src/app/shared-services/get-product-dto';
import { ProductsService } from 'src/app/shared-services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  submitting: boolean = false;
  selectedFiles: any[] = [];
  fileReader = new FileReader();
  selectedFileData: any[] = [];

  createProductForm: FormGroup = this.formBuilder.group({
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


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private popUpService: PopUpNotificationService
  ) { }

  ngOnInit(): void {
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

  createProduct() {
    this.submitting = true;
    this.productService.createProduct(this.createProductForm.value, this.selectedFiles)
      .subscribe(
        (response: ServerResponseDto) => {
          console.log(response)
          if (response.status == 'success') {
            this.popUpService.addNotification(response.message, 5000);
            this.createProductForm.reset();
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
