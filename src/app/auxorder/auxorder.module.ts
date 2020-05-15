import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuxorderPageRoutingModule } from './auxorder-routing.module';

import { AuxorderPage } from './auxorder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuxorderPageRoutingModule
  ],
  declarations: [AuxorderPage]
})
export class AuxorderPageModule {}
