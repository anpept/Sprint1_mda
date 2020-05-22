import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController, LoadingController, NavController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage {

  filtro: any;
  orders: any;

  constructor(private actRoute: ActivatedRoute,
              private router: Router,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private firestore: AngularFirestore,
              private alertCtrl: AlertController,
              public afAuth: AngularFireAuth,
              public navCtrl: NavController) {

    this.filtro = this.actRoute.snapshot.paramMap.get('filter');

  }

  ionViewWillEnter() {
    this.getFireOrders();
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
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
