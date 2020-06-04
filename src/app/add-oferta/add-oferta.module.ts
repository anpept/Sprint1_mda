import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOfertaPageRoutingModule } from './add-oferta-routing.module';

import { AddOfertaPage } from './add-oferta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOfertaPageRoutingModule
  ],
  declarations: [AddOfertaPage]
})
export class AddOfertaPageModule {}
