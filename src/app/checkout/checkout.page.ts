import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {AngularFireModule} from "@angular/fire";
import {User} from "../models/user.model";
import {LoadingController, NavController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import { PayPal, PayPalPayment, PayPalConfiguration } from "@ionic-native/paypal/ngx";
import {Order} from "../models/order.model";
import {ServicioCheckService} from "./servicio-check.service";
import {CarroService} from "../carro/carro.service";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  id: any;
  user = {} as User;
  order = {} as Order;
  cliente: any;
  mensaje: string;
  direccion: string;
  date: Date;

  paymentAmount: string = '5.25';
  currency: string = 'EUR';
  currencyIcon: string = '€';

  constructor(private afAuth: AngularFireModule,
              private loadingCtrl: LoadingController,
              private firestore: AngularFirestore,
              private payPal: PayPal,
              private servicioCheck: ServicioCheckService,
              private navCtrl: NavController,
              private carro: CarroService,
              ) {
      let _this = this;
      setTimeout(() => {
          // EL botón se renderiza en el ID #paypal-button-container
          <any>window['paypal'].Buttons({

              // Set up the transaction
              createOrder: function (data, actions) {
                  return actions.order.create({
                      purchase_units: [{
                          amount: {
                              value: _this.paymentAmount
                          }
                      }]
                  });
              },

              // Finalize the transaction
              onApprove: function (data, actions) {
                  return actions.order.capture()
                      .then(function (details) {
                          console.log(details);
                          // Show a success message to the buyer
                          alert('Transaction completed by ' + details.payer.name.given_name + '!');
                      })
                      .catch(err => {
                          console.log(err);
                      })
              }
          }).render('#paypal-button-container');
      }, 500)
  }

  ngOnInit() {
    this.cliente = firebase.auth().currentUser;
    if (this.cliente != null){
      this.getUserById(this.cliente.uid);
    }else{
      console.log("No se han podido recuperar las credenciales");
    }
    this.date = new Date();
    console.log(this.date);
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
    console.log("Se procesa el pago correctamente");
    this.payPal.init({
      PayPalEnvironmentProduction: 'Aquí iría el ID de producción',
      PayPalEnvironmentSandbox: 'ATlQ0MIpr4-8ul-XUPGnNfyeo1FUK-AuZQ60uiKeHK8aWwfSb1l2N3d3Q--Hibuyxepej8ZLpfkJmPNA'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
        }, () => {
          // console.log("Error en la finalización del pago");
        });
      }, () => {
        //console.log("Error en la configuración");
      });
    }, () => {
      //console.log("Error en la inicialización, paypal no esta disponible en este momento");
    });
  }

  setMensaje(mensaje){
      this.makeOrder();
      this.servicioCheck.setMessage(mensaje);
      this.servicioCheck.setOrder(this.order);
      this.navCtrl.navigateRoot('finish-pay');
  }

  makeOrder(){
      console.log("WEY SI ENTRO AQUÍ")
      this.order.user = this.user.name + " " + this.user.surname;
      this.order.date = new Date();
      this.order.products = this.carro.getArrayProducts();
      this.order.price = this.carro.getPrecio();
      this.order.address = this.direccion;
  }




}
