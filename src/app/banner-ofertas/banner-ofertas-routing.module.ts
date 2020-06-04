import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannerOfertasPage } from './banner-ofertas.page';

const routes: Routes = [
  {
    path: '',
    component: BannerOfertasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BannerOfertasPageRoutingModule {}
