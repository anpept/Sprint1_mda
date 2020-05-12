import { Component, OnInit } from '@angular/core';
import {Order} from '../models/order.model';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders: Order[] = [
    {
      date: new Date(2020, 3, 29, 12, 33, 32),
      products: ['Pizza', 'Papas Fritas', 'Fanta Naranja', 'Ensalada'],
      price: 30.59,
      user: 'Antonio',
      address: 'C/ Test nº 10',
      estado: 'Completado'
    },
    {
      date: new Date(2020, 4, 2, 12, 38, 37),
      products: ['Pan de ajo', 'Pizza Opera', 'Pizza Casera'],
      price: 24.54,
      user: 'Cliente',
      address: 'C/ Cliente nº 9',
      estado: 'Completado'
    },
    {
      date: new Date(2020, 4, 8, 11, 15, 13),
      products: ['Ensalada', 'Pizza Opera', 'Batido de Fresa', 'Coca Cola'],
      price: 25.43,
      user: 'Admin',
      address: 'C/ Admin nº 100',
      estado: 'Cancelado'
    },
    {
      date: new Date(2020, 4, 8, 13, 5, 0),
      products: ['Pizza', 'Pizza Casera', 'Pizza Opera'],
      price: 37.95,
      user: 'Antonio',
      address: 'C/ Test nº 10',
      estado: 'Sin repartir'
    },
    {
      date: new Date(2020, 4, 10, 15, 10, 7),
      products: ['Pizza', 'Pan de Ajo', 'Pizza Casera', 'Batido de Fresa', 'Papas Fritas'],
      price: 37.08,
      user: 'Cliente',
      address: 'C/ Cliente nº 9',
      estado: 'Pendiente de Pago'
    }
    ];

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
