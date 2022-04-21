import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicIndexRoutingModule } from './public-index-routing.module';
import { PublicIndexComponent } from './public-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PublicIndexComponent
  ],
  imports: [
    CommonModule,
    PublicIndexRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PublicIndexModule { }
