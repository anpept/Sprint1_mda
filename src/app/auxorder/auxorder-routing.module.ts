import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuxorderPage } from './auxorder.page';

const routes: Routes = [
  {
    path: '',
    component: AuxorderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuxorderPageRoutingModule {}
