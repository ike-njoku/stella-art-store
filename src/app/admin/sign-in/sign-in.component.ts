import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpNotificationService } from 'src/app/pop-up-notification/pop-up-notification.service';
import { ServerResponseDto } from 'src/app/shared-interfaces/server-response-dto';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  submitting: boolean = false;
  adminSignInForm: FormGroup = this.formBuilder.group({
    userName: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private popUp: PopUpNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signIn() {
    this.submitting = true;
    this.authService.signIn(this.adminSignInForm.value)
      .subscribe(
        (response: ServerResponseDto) => {
          this.submitting = false;
          if (response.status == 'success') {
            this.router.navigate(['admin/dashboard/home'])
          } else {
            this.popUp.addNotification(response.message, 5000);
          }
        },
        (error: string) => {
          this.popUp.addNotification(error, 5000)
          this.submitting = false;
        }
      )
  }
}
