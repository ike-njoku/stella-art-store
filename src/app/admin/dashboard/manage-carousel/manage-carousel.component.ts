import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadService } from '../../file-upload.service';
export interface UploadCarouselImage {
  alt: string;
  files: any[];
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


  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileUploadService
  ) {}

  uploadCarouselImageForm = this.formBuilder.group({
    files: [null, Validators.required]
  });

  submitCarouselImage() {
    const subUrl = '';
    return this.fileService.uploadFormData(
      this.selectedFiles,
      subUrl,
      this.uploadCarouselImageForm.value
    )
    .subscribe(
      (response) => {
        window.alert(response)
      },
      (error) => {
        window.alert(error)
      }
    )

  }

  ngOnInit(): void {
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
