import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
{ path: '',  component: AdminComponent, children: [
    {
      path: 'sign-in', loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule)
     }
  ] },
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
