import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GetFileDTO } from 'src/app/shared-interfaces/get-file-dto';
import { environment } from 'src/environments/environment';
import { FileUploadService } from '../../file-upload.service';
import { CarouselImageService } from './carousel-image.service';
export interface UploadCarouselImage extends GetFileDTO{
  alt: string;
}

@Component({
  selector: 'app-manage-carousel',
  templateUrl: './manage-carousel.component.html',
  styleUrls: ['./manage-carousel.component.css']
})
export class ManageCarouselComponent implements OnInit {
  submitting: boolean = false;
  selectedFiles: any[] = [];
  fileReader = new FileReader();
  selectedFileData: any[] = [];
  carouselImages: any[] = [];
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileUploadService,
    private carouselImageService: CarouselImageService
  ) {}

  uploadCarouselImageForm = this.formBuilder.group({
    files: [null, Validators.required],
    alt: [null, Validators.required]
  });

  submitCarouselImage() {
    const subUrl = 'carousel-images';
    return this.fileService.uploadFormData(
      this.selectedFiles,
      subUrl,
      this.uploadCarouselImageForm.value
    )
    .subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
       console.log(error)
      }
    )

  }

  ngOnInit(): void {
    this.getCarouselImages()
  }

  getCarouselImages() {
    this.carouselImageService.getCarouselImages()
      .subscribe(
        (response) => {
          this.carouselImages = response.data;
        }
      )
  }

  selectFiles(event: any) {
    this.selectedFileData = [];
    let filesArray = Array.from(event.target.files);
    filesArray.forEach((file: any) => {
      this.selectedFiles.push(file);
      this.readFile(file);
    });
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


}
