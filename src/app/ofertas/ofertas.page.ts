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
ofertas: any;
  constructor(private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private firestore: AngularFirestore,
              public afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public alertController: AlertController) { }

  ionViewWillEnter() {
    this.getOfertas();
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
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
            desc: e.payload.doc.data()['desc'],
            final_price: e.payload.doc.data()['final_price'],
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

  async presentAlert(id: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Confirmar proceso',
      message: '¿Desea eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteUser(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteUser(id: string) {
    //muestra el loader
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    await this.firestore.doc('ofertas/' + id).delete();

    (await loader).dismiss();
    console.log(id);
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

}
