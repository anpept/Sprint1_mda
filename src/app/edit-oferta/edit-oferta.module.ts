import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOfertaPageRoutingModule } from './edit-oferta-routing.module';

import { EditOfertaPage } from './edit-oferta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOfertaPageRoutingModule
  ],
  declarations: [EditOfertaPage]
})
export class EditOfertaPageModule {}
