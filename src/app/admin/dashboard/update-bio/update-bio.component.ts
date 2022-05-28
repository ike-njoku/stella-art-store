import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { BioService } from './bio.service';

@Component({
  selector: 'app-update-bio',
  templateUrl: './update-bio.component.html',
  styleUrls: ['./update-bio.component.css']
})
export class UpdateBioComponent implements OnInit {
  bio!: string;
  constructor(
    private bioService: BioService,
    private formBuilder: FormBuilder,
    private notificationService: PopUpNotificationService
  ) { }

  bioForm: FormGroup = this.formBuilder.group(
    {
      bio: [null, Validators.required]
    }
  )

  ngOnInit(): void {
    this.getBio();
  }

  submit() {
    this.bioService.updateBio(this.bioForm.value)
      .subscribe(
        (response) => {
          this.notificationService.addNotification(response.message, 5000)
        },
        (error) => {
          this.notificationService.addNotification(error, 5000)
        }
      )
  }

  getBio() {
    this.bioService.getBio()
      .subscribe(
        (response) => {
          console.log(response);
          if (response.status == 'success') {
            this.bio = response.data.bio;
          }
        },
        (error: any) => {
          console.log(error)
        }
      )
  }

}
