import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOfertaPage } from './add-oferta.page';

const routes: Routes = [
  {
    path: '',
    component: AddOfertaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOfertaPageRoutingModule {}
