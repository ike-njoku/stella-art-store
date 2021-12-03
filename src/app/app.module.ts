import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopUpNotificationModule } from './pop-up-notification/pop-up-notification.module';
import { AuthGuard } from './admin/auth/auth.guard';
import { FlutterwaveModule } from 'flutterwave-angular-v3';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PopUpNotificationModule,
    FlutterwaveModule
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
