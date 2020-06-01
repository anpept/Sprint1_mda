import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishPayPage } from './finish-pay.page';

const routes: Routes = [
  {
    path: '',
    component: FinishPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishPayPageRoutingModule {}
