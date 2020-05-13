import { Component, OnInit } from '@angular/core';
import {Order} from '../models/order.model';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {



  constructor() {}


    ngOnInit() {}

}

  /*logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }
  async getProducts() {
    // show loader
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();

    try {
      this.firestore.collection('products').snapshotChanges().subscribe(data => {
        this.products = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            type: e.payload.doc.data()['type'],
            price: e.payload.doc.data()['price'],
            imageURL: e.payload.doc.data()['imageURL']
          };
        });
      });

      // dismiss loader
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
  }*/
