import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'update-bio', loadChildren: () => import('./update-bio/update-bio.module').then(m => m.UpdateBioModule) },
      { path: 'orders/all', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'products/update/:id', loadChildren: () => import('./update-product/update-product.module').then(m => m.UpdateProductModule) },
      { path: 'products/list', loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule) },
      { path: 'orders/:id', loadChildren: () => import('./order-detail/order-detail.module').then(m => m.OrderDetailModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
