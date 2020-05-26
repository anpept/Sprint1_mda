import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {AngularFireModule} from "@angular/fire";
import {User} from "../models/user.model";
import {LoadingController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import { PayPal, PayPalPayment, PayPalConfiguration } from "@ionic-native/paypal/ngx";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  id: any;
  user = {} as User;
  cliente: any;

  paymentAmount: string = '5.25';
  currency: string = 'EUR';
  currencyIcon: string = '€';

  constructor(private afAuth: AngularFireModule,
              private loadingCtrl: LoadingController,
              private firestore: AngularFirestore,
              private payPal: PayPal) { }

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

  payWithPaypal() {
    console.log("Pagar ????");
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'ATlQ0MIpr4-8ul-XUPGnNfyeo1FUK-AuZQ60uiKeHK8aWwfSb1l2N3d3Q--Hibuyxepej8ZLpfkJmPNA'
    }).then(() => {
      console.log("Fallo AQUÍ");
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }



}
