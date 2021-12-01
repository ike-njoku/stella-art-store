import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicIndexComponent } from './public-index.component';

const routes: Routes = [{ path: '', component: PublicIndexComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicIndexRoutingModule { }
