import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {AngularFireModule} from "@angular/fire";
import {User} from "../models/user.model";
import {LoadingController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  id: any;
  user = {} as User;
  cliente: any;
  constructor(private afAuth: AngularFireModule,
              private loadingCtrl: LoadingController,
              private firestore: AngularFirestore) { }

  ngOnInit() {
    this.cliente = firebase.auth().currentUser;
    if (this.cliente != null){
      this.getUserById(this.cliente.uid);
    }else{
      console.log("No se han podido recuperar las credenciales");
    }

  }

  async getUserById(id: string){
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();

    this.firestore.doc("users/" + id).valueChanges().subscribe(data =>{
      this.user.email = data["email"];
      this.user.password = data["password"];
      this.user.name = data["name"];
      this.user.surname = data["surname"];
      this.user.type = data["type"];
      this.user.category = data["category"];
      this.user.other_data = data["other_data"];
    });
    (await loader).dismiss();
  }

  setUser() {
    /*this.cliente = this.afAuth.auth().currentUser;
    if (this.cliente != null){
      console.log(this.cliente);
    }*/


  }

}
