import { Component } from '@angular/core';
import {LoadingController, ToastController, NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-promociones',
  templateUrl: 'promociones.page.html',
  styleUrls: ['promociones.page.scss'],
})
export class PromocionesPage {
  users: any;
  promociones: any;
  constructor(
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private firestore: AngularFirestore,
      public afAuth: AngularFireAuth,
      public navCtrl: NavController,
      public alertController: AlertController) {}

  ionViewWillEnter() {
    this.getPromociones();
  }

  // logout

  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }
  async presentAlert(id: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Confirmar proceso',
      message: '¿Desea eliminar esta promocion?',
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
              this.deletePromo(id);
            }
          }
      ]
    });

    await alert.present();
  }

  async deletePromo(id: string) {
    //muestra el loader
    let loader = this.loadingCtrl.create({
      message: "Please wait..."
    });
    (await loader).present();

    await this.firestore.doc("promociones/"+id).delete();

    (await loader).dismiss();
    console.log(id);
  }
  async getPromociones() {
    // show loader
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();

    try {
      this.firestore.collection('promociones').snapshotChanges().subscribe(data => {
        this.promociones = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            price: e.payload.doc.data()['price'],
            imageURL: e.payload.doc.data()['imageURL'],
            productos: e.payload.doc.data()['productos']
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
