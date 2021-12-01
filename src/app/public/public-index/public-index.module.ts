import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicIndexRoutingModule } from './public-index-routing.module';
import { PublicIndexComponent } from './public-index.component';


@NgModule({
  declarations: [
    PublicIndexComponent
  ],
  imports: [
    CommonModule,
    PublicIndexRoutingModule
  ]
})
export class PublicIndexModule { }
