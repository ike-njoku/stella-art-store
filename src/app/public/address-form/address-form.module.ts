import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressFormRoutingModule } from './address-form-routing.module';
import { AddressFormComponent } from './address-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddressFormComponent
  ],
  imports: [
    CommonModule,
    AddressFormRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AddressFormModule { }
