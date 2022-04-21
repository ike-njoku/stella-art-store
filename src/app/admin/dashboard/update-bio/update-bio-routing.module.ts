import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateBioComponent } from './update-bio.component';

const routes: Routes = [{ path: '', component: UpdateBioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateBioRoutingModule { }
