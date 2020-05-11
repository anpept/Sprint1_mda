import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController, NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { CarroPage } from '../carro/carro.page';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth, public navCtrl: NavController,private carro: CarroPage) { }

  ngOnInit() {
  }
  addToCart(i){
    this.carro.anadirAlCarro(i);
  }
  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }
}
