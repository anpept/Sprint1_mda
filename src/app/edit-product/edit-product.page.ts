import { Component, OnInit } from '@angular/core';
import {Product} from '../models/product.model';
import {ActivatedRoute} from '@angular/router';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  product = {} as Product;
  id: any;

  constructor(
      private actRoute: ActivatedRoute,
      private loadingCtrl: LoadingController,
      private firestore: AngularFirestore,
      private toastCtrl: ToastController,
      private navCtrl: NavController,
      private storage: AngularFirestore
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getProductById(this.id);
    //this.urlImage =
  }

  async getProductById(id: string){
    let loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();

    this.firestore.doc('products/' + id).valueChanges().subscribe(data => {
      this.product.name = data["name"];
      this.product.price = data["price"];
      this.product.type = data["type"];
    });
    (await loader).dismiss();
  }

  async updateProduct(product: Product){
    if (this.formValidation()) {
      // show loader
      let loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();

      try {
        await this.firestore.doc('products/'+this.id).update(product);
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
    if (!this.product.name) {
      this.showToast('Enter email');
      return false;
    }

    if (!this.product.price) {
      this.showToast('Enter password');
      return false;
    }

    if (!this.product.type) {
      this.showToast('Enter name');
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

  /*onUpload(event) {
    //console.log('subir', event.target.files[0]);
    //Generar id único a la imagen
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = 'profile/image_'+id+'.jpg';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }*/
}
