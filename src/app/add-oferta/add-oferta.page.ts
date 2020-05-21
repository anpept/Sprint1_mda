import { Component, OnInit } from '@angular/core';
import {Oferta} from '../models/oferta.model';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-add-oferta',
  templateUrl: './add-oferta.page.html',
  styleUrls: ['./add-oferta.page.scss'],
})
export class AddOfertaPage implements OnInit {
oferta = {} as Oferta;
  urlImage: Observable<string>;
  constructor(private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private afAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  async createOferta(oferta: Oferta) {

    if (this.formValidation()) {
      // show loader
      const loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();

      try {
        await this.firestore.collection('ofertas').add(oferta);
      } catch (e) {
        this.showToast(e);
      }

      // dismiss loader
      (await loader).dismiss();

      // redirect to home page
      this.navCtrl.navigateRoot('home');
    }
  }

  formValidation() {
    if (!this.oferta.name) {
      this.showToast('Enter name');
      return false;
    }

    if (!this.oferta.type) {
      this.showToast('Enter type');
      return false;
    }

    if (!this.oferta.price) {
      this.showToast('Enter price');
      return false;
    }
    if (!this.oferta.desc) {
      this.showToast('Enter discount');
      return false;
    }
    if (!this.oferta.final_price) {
      this.showToast('Enter final price');
      return false;
    }
    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000
    }).then(toastData => toastData.present());
  }

  onUpload(event) {
    // console.log('subir', event.target.files[0]);
    // Generar id único a la imagen
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = 'comida/image_'+id+'.jpg';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
}
