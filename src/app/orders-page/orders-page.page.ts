import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.page.html',
  styleUrls: ['./orders-page.page.scss'],
})
export class OrdersPagePage {

  constructor(public afAuth: AngularFireAuth,
              public navCtrl: NavController) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }

}
