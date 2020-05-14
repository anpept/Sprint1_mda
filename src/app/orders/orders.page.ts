import { Component, OnInit } from '@angular/core';
import {Order} from '../models/order.model';
import {OrdersService} from './orders.service';
import {AlertController} from '@ionic/angular';
import {Router} from "@angular/router";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders = [];

  constructor(private ordersService: OrdersService,
              private router: Router,
              private alertCtrl: AlertController) {}


    ngOnInit() {
      this.orders = this.ordersService.getOrders();
    }

    async deleteOrder(orderId) {
      const alertElement = await this.alertCtrl.create({
        header: 'Are you sure, you want to delete it?',
        message: 'Be careful',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'botones',
          },
          {
            text: 'Confirm',
            cssClass: 'boton_cancel',
            handler: () => {
              this.ordersService.deleteOrder(orderId);
              this.orders = this.ordersService.getOrders();
              console.log(this.orders);
            }
          }
        ],
        cssClass: 'alerta',
      });
      await alertElement.present();
    }

}
