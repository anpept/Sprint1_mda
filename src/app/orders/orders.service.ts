import { Injectable } from '@angular/core';
import {Order} from '../models/order.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {LoadingController, ToastController} from "@ionic/angular";


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: any;
  constructor(private firestore: AngularFirestore,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController
  ) { }

  async getOrders() {
    this.getFireOrders();
    console.log("Aquí va" + this.orders);

  }

  async getFireOrders() {
    try {
      this.orders = this.firestore.collection('aux').snapshotChanges().subscribe(data => {
        this.orders = data.map(e => {
          return {
            id: e.payload.doc.id,
            /*date: e.payload.doc.data()["date"],
            products: e.payload.doc.data()["products"],
            price: e.payload.doc.data()["price"],
            user: e.payload.doc.data()["user"],
            address: e.payload.doc.data()["address"],
            estado: e.payload.doc.data()["estado"]*/
            name: e.payload.doc.data()["name"],
            estado: e.payload.doc.data()["estado"],
            user: e.payload.doc.data()["user"],
          };
        });
      });
    } catch (e) {
      console.log(e);
    }
    return this.orders;
  }

showToast(message: string) {
  this.toastCtrl.create({
    message,
    duration: 3000
  }).then(toastData => toastData.present());
}

  /*deleteOrder(orderId: string) {
    this.orders = this.orders.filter(order => {
      return order.id !== orderId;
    });
  }*/
}
