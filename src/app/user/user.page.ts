import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController, NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { CarroService } from '../carro/carro.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth, public navCtrl: NavController, private carro:CarroService) { }

  ngOnInit() {
  }
  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }
  addToCart(i){
    var pro =this.carro.getProducts();
    var can =this.carro.getCantidades();
    pro.push(i);
    can.push(1);
    this.carro.setProducts(pro);
    this.carro.setCantidades(can);
    console.log(this.carro.getProducts());
    console.log(this.carro.getCantidades());
  }
}
