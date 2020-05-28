import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product.model';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-promo.page.html',
  styleUrls: ['./add-promo.page.scss'],
})
export class AddPromoPage implements OnInit {
promo = {} as Product;
urlImage: Observable<string>;
  constructor(private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private afAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private storage: AngularFireStorage
             ) { }

  ngOnInit() {}

  async createProduct(promo: Product) {

    if (this.formValidation()) {
      // show loader
      const loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();

      try {
        await this.firestore.collection('products').add(promo);
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
    if (!this.promo.name) {
      this.showToast('Enter name');
      return false;
    }

    if (!this.promo.type) {
      this.showToast('Enter type');
      return false;
    }

    if (!this.promo.price) {
      this.showToast('Enter price');
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
