import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpNotificationComponent } from './pop-up-notification/pop-up-notification.component';
import { PopUpNotificationService } from './pop-up-notification.service';



@NgModule({
  declarations: [
    PopUpNotificationComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    PopUpNotificationService
  ],
  exports: [PopUpNotificationComponent]
})
export class PopUpNotificationModule { }
