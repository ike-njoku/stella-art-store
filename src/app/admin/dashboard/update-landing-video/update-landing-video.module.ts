import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateLandingVideoRoutingModule } from './update-landing-video-routing.module';
import { UpdateLandingVideoComponent } from './update-landing-video.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateLandingVideoComponent
  ],
  imports: [
    CommonModule,
    UpdateLandingVideoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UpdateLandingVideoModule { }
