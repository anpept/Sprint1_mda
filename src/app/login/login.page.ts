import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
user = {} as User;
  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private afAuth: AngularFireAuth, private navCtrl: NavController,private router: Router) { }

  ngOnInit() {
  }

  async login(user: User) {
    if (this.formValidation()) {
      // show loader
      const loader = this.loadingCtrl.create({
        message: 'Please wait...'
      });
      (await loader).present();

      try {
        let logging =await this.afAuth.signInWithEmailAndPassword(user.email, user.password).then(data => {
          console.log(data);
          console.log(data.user.uid);
          // redirect to home page
          if (user.email === 'admin@admin.com' && user.password === '123456') {
            this.navCtrl.navigateRoot('admin-panel');
          } else {
            let navigationExtras = {
              queryParams: {
                id: data.user.uid
              }
            };
            this.router.navigate(['user'], navigationExtras);
          }
        });
        console.log(logging);
      } catch (e) {
        this.showToast(e);
      }

      // dismiss loader
      (await loader).dismiss();
    }
  }
  formValidation() {
    if (!this.user.email) {
      this.showToast('Enter email');
      return false;
    }

    if (!this.user.password) {
      this.showToast('Enter password');
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
