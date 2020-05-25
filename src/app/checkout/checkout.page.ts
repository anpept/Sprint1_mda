import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {AngularFireModule} from "@angular/fire";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  cliente: any;
  constructor(private afAuth: AngularFireModule) { }

  ngOnInit() {
    this.cliente = firebase.auth().currentUser;
    if (this.cliente != null){
      console.log(this.cliente);
    }else{
      console.log("Huje "+this.cliente);
    }
  }

  setUser() {
    this.cliente = this.afAuth.auth().currentUser;
    if (this.cliente != null){
      console.log(this.cliente);
    }


  }

}
