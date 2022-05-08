import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCarouselComponent } from './manage-carousel.component';

const routes: Routes = [{ path: '', component: ManageCarouselComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCarouselRoutingModule { }
