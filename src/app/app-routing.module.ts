import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },{
<<<<<<< HEAD
=======
    path: 'add-promo',
    loadChildren: () => import('./add-promo/add-promo.module').then( m => m.AddPromoPageModule)
  },{
>>>>>>> addpromo
    path: 'carro',
    loadChildren: () => import('./carro/carro.module').then( m => m.CarroPageModule)
  },
  {
    path: 'edit-product/:id',
    loadChildren: () => import('./edit-product/edit-product.module').then( m => m.EditProductPageModule)
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./admin-panel/admin-panel.module').then( m => m.AdminPanelPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'ofertas',
    loadChildren: () => import('./ofertas/ofertas.module').then( m => m.OfertasPageModule)
  },
  {
    path: 'add-oferta',
    loadChildren: () => import('./add-oferta/add-oferta.module').then( m => m.AddOfertaPageModule)
  },
  {
    path: 'banner-ofertas',
    loadChildren: () => import('./banner-ofertas/banner-ofertas.module').then( m => m.BannerOfertasPageModule)
  },
  {
    path: 'edit-oferta/:id',
    loadChildren: () => import('./edit-oferta/edit-oferta.module').then( m => m.EditOfertaPageModule)
  },
  {
    path: 'find-us',
    loadChildren: () => import('./find-us/find-us.module').then( m => m.FindUsPageModule)
  }
      path: 'orders-page',
    loadChildren: () => import('./orders-page/orders-page.module').then( m => m.OrdersPagePageModule)
  },
  {
    path: 'filter/:filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'finish-pay',
    loadChildren: () => import('./finish-pay/finish-pay.module').then( m => m.FinishPayPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
