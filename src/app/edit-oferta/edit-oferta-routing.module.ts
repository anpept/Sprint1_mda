import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOfertaPage } from './edit-oferta.page';

const routes: Routes = [
  {
    path: '',
    component: EditOfertaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOfertaPageRoutingModule {}
