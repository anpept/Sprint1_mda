import { Component } from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage {

  orders: any;

  constructor(private router: Router,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private firestore: AngularFirestore,
              private alertCtrl: AlertController) {}

    ionViewWillEnter() {
      this.getFireOrders();
    }

 async getFireOrders() {
    let loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();

    try {
      this.firestore.collection('orders').snapshotChanges().subscribe(data => {
        this.orders = data.map(e => {
          return {
            id: e.payload.doc.id,
            date: e.payload.doc.data()["date"],
            products: e.payload.doc.data()["products"],
            price: e.payload.doc.data()["price"],
            user: e.payload.doc.data()["user"],
            address: e.payload.doc.data()["address"],
            estado: e.payload.doc.data()["estado"]
          };
        });
      });

      (await loader).dismiss();
    } catch (e) {
      this.showToast(e);
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000
    }).then(toastData => toastData.present());
  }


    async deleteOrder(orderId: string) {
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
              this.removeFireOrder(orderId);
            }
          }
        ],
        cssClass: 'alerta',
      });
      await alertElement.present();
    }

    async removeFireOrder(id: string){
      let loader = this.loadingCtrl.create({
        message: "Please Wait..."
      });
      (await loader).present();
      await this.firestore.doc("orders/" + id).delete();
      (await loader).dismiss();
    }

}
