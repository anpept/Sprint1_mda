import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BannerOfertasPageRoutingModule } from './banner-ofertas-routing.module';

import { BannerOfertasPage } from './banner-ofertas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BannerOfertasPageRoutingModule
  ],
  declarations: [BannerOfertasPage]
})
export class BannerOfertasPageModule {}
