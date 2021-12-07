import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutSuccessRoutingModule } from './checkout-success-routing.module';
import { CheckoutSuccessComponent } from './checkout-success.component';


@NgModule({
  declarations: [
    CheckoutSuccessComponent
  ],
  imports: [
    CommonModule,
    CheckoutSuccessRoutingModule
  ]
})
export class CheckoutSuccessModule { }
