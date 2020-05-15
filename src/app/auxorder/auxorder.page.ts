import { Component, OnInit } from '@angular/core';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorage} from '@angular/fire/storage';
import {AuxOrder} from '../models/auxorder.model';

@Component({
  selector: 'app-auxorder',
  templateUrl: './auxorder.page.html',
  styleUrls: ['./auxorder.page.scss'],
})
export class AuxorderPage implements OnInit {
  order = {} as AuxOrder;
  constructor(private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private afAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private storage: AngularFireStorage
  ) { }

  ngOnInit() {}

  async createAux(order: AuxOrder) {

    order.date = new Date();

    if (this.formValidation()) {
      // show loader
      const loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();

      try {
        await this.firestore.collection('aux').add(order);
      } catch (e) {
        this.showToast(e);
      }

      // dismiss loader
      (await loader).dismiss();

      // redirect to home page
      this.navCtrl.navigateRoot('admin-panel');
    }
  }

  formValidation() {
    /*if (!this.product.name) {
      this.showToast('Enter name');
      return false;
    }

    if (!this.product.type) {
      this.showToast('Enter type');
      return false;
    }

    if (!this.product.price) {
      this.showToast('Enter price');
      return false;
    }*/
    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

}

