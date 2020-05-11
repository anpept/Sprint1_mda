import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})
export class AdminPanelPage implements OnInit {

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
