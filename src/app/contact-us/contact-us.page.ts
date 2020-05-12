import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact.module';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {
contact = {} as Contact;
  constructor(private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private afAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private storage: AngularFireStorage) { }

  ngOnInit() {}

  async createContact(contact: Contact) {
    if (this.formValidation()) {
      // show loader
      const loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();

      try {
        await this.firestore.collection('contact-us-section').add(contact);
      } catch (e) {
        this.showToast(e);
      }

      // dismiss loader
      (await loader).dismiss();

      // redirect to home page
      this.navCtrl.navigateRoot('user');
    }
  }

  formValidation() {
    if (!this.contact.name) {
      this.showToast('Enter name');
      return false;
    }

    if (!this.contact.email) {
      this.showToast('Enter email');
      return false;
    }

    if (!this.contact.phone) {
      this.showToast('Enter phone');
      return false;
    }
    if (!this.contact.message) {
      this.showToast('Enter message');
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
}
