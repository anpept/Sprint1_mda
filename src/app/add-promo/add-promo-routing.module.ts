import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPromoPage } from './add-promo.page';

const routes: Routes = [
  {
    path: '',
    component: AddPromoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProductPageRoutingModule {}
