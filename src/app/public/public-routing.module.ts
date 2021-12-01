import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./public-index/public-index.module').then(m => m.PublicIndexModule) },
  { path: 'shop', loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule), },
  { path: 'product/:id', loadChildren: () => import('./product-detail/product-detail.module').then(m => m.ProductDetailModule) },
  { path: 'checkout/cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'checkout/address', loadChildren: () => import('./address-form/address-form.module').then(m => m.AddressFormModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
