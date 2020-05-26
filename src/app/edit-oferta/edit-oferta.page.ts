import { Component, OnInit } from '@angular/core';
import {Oferta} from '../models/oferta.model';
import {ActivatedRoute} from '@angular/router';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-edit-oferta',
  templateUrl: './edit-oferta.page.html',
  styleUrls: ['./edit-oferta.page.scss'],
})
export class EditOfertaPage implements OnInit {
  oferta = {} as Oferta;
  id: any;
  urlImage: Observable<string>;
  constructor(private actRoute: ActivatedRoute,
              private loadingCtrl: LoadingController,
              private firestore: AngularFirestore,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private storage: AngularFireStorage) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getOfertaById(this.id);
  }

  async getOfertaById(id: string) {
    let loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();

    this.firestore.doc('ofertas/' + id).valueChanges().subscribe(data => {
      this.oferta.name = data["name"];
      this.oferta.price = data["price"];
      this.oferta.type = data["type"];
      this.oferta.imageURL = data["imageURL"];
      this.oferta.desc = data["desc"];
      this.oferta.final_price = data["final_price"];
    });
    (await loader).dismiss();
  }

  async updateOferta(oferta: Oferta) {
    if (this.formValidation()) {
      // show loader
      let loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();

      try {
        await this.firestore.doc('ofertas/' + this.id).update(oferta);
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
      this.showToast('Enter a name, please.');
      return false;
    }

    if (!this.oferta.price) {
      this.showToast('Enter a price, please.');
      return false;
    }

    if (!this.oferta.type) {
      this.showToast('Enter a type, please.');
      return false;
    }

    if (!this.oferta.desc) {
      this.showToast('Enter a discount, please.');
      return false;
    }

    if (!this.oferta.final_price) {
      this.showToast('Enter a final price, please.');
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
    //console.log('subir', event.target.files[0]);
    //Generar id único a la imagen
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = 'profile/image_'+id+'.jpg';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
}
