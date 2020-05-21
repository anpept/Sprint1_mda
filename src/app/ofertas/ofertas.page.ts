import { Component } from '@angular/core';
import {LoadingController, ToastController, NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],
})
export class OfertasPage {

  constructor(private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private firestore: AngularFirestore,
              public afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public alertController: AlertController) { }

  ionViewWillEnter() {}

  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }

}
