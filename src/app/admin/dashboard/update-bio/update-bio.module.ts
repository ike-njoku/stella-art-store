import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateBioRoutingModule } from './update-bio-routing.module';
import { UpdateBioComponent } from './update-bio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateBioComponent
  ],
  imports: [
    CommonModule,
    UpdateBioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UpdateBioModule { }
