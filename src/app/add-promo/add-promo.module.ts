import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProductPageRoutingModule } from './add-promo-routing.module';

import { AddPromoPage } from './add-promo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProductPageRoutingModule
  ],
  declarations: [AddPromoPage]
})
export class AddPromoPageModule {}
