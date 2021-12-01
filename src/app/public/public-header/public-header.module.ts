import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicHeaderComponent } from './public-header/public-header.component';



@NgModule({
  declarations: [
    PublicHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [PublicHeaderComponent]
})
export class PublicHeaderModule { }
