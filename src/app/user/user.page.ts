import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController, NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { CarroService } from '../carro/carro.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth, public navCtrl: NavController, private carro:CarroService,private route: ActivatedRoute) { }

  ngOnInit() {
  }
  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }
  edit() {
    this.route.queryParams.subscribe(params => {
      let date = params['id'];
      console.log(date); // Print the parameter to the console. 
      this.navCtrl.navigateRoot('edit-user/'+date);
  });
      
  }
  addToCart(i){
    console.log(this.carro.addProduct(i));
    
  }
}
