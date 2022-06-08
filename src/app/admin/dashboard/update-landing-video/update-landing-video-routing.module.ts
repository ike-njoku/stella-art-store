import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateLandingVideoComponent } from './update-landing-video.component';

const routes: Routes = [{ path: '', component: UpdateLandingVideoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateLandingVideoRoutingModule { }
