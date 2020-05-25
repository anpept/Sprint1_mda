import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController, NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { CarroService } from '../carro/carro.service';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-banner-ofertas',
  templateUrl: './banner-ofertas.page.html',
  styleUrls: ['./banner-ofertas.page.scss'],
})
export class BannerOfertasPage implements OnInit {
ofertas: any;
  constructor(private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private firestore: AngularFirestore,
              public afAuth: AngularFireAuth,
              public navCtrl: NavController,
              private route: ActivatedRoute) { }

  ngOnInit() {}

  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }

  ionViewWillEnter() {
    this.getOfertas();
  }

  async getOfertas() {
    // show loader
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();

    try {
      this.firestore.collection('ofertas').snapshotChanges().subscribe(data => {
        this.ofertas = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            type: e.payload.doc.data()['type'],
            price: e.payload.doc.data()['price'],
            imageURL: e.payload.doc.data()['imageURL'],
            desc: e.payload.doc.data()['desc'],
            final_price: e.payload.doc.data()['final_price'],
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
  }

}
