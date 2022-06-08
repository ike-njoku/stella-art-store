import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../file-upload.service';

@Component({
  selector: 'app-update-landing-video',
  templateUrl: './update-landing-video.component.html',
  styleUrls: ['./update-landing-video.component.css']
})
export class UpdateLandingVideoComponent implements OnInit {
  selectedFiles: any[] = [];
  fileReader = new FileReader();
  selectedFileData: any[] = [];
  uploadVideoForm: FormGroup = this.formBuilder.group({
    files: [null, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  submit() {

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

  uploadVideo() {
    const subUrl = 'carousel-image';
    return this.fileService.uploadFormData(
      this.selectedFiles,
      subUrl,
      this.uploadVideoForm.value
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

}
