import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishPayPageRoutingModule } from './finish-pay-routing.module';

import { FinishPayPage } from './finish-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishPayPageRoutingModule
  ],
  declarations: [FinishPayPage]
})
export class FinishPayPageModule {}
