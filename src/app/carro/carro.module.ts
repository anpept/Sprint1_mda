import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarroService } from './carro.service';

import { CarroPage } from './carro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CarroPage
      }
    ])
  ],providers: [
    CarroService
  ],
  declarations: [CarroPage]
})
export class CarroPageModule {}
