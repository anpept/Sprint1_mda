import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PromocionesPageRoutingModule } from './promociones-routing.module';
import { PromocionesPage } from './promociones.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PromocionesPageRoutingModule
  ],
  declarations: [PromocionesPage]
})
export class PromocionesPageModule {}
