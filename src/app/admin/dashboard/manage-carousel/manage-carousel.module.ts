import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCarouselRoutingModule } from './manage-carousel-routing.module';
import { ManageCarouselComponent } from './manage-carousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageCarouselComponent
  ],
  imports: [
    CommonModule,
    ManageCarouselRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManageCarouselModule { }
