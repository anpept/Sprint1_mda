import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {AngularFireModule} from "@angular/fire";
import {User} from "../models/user.model";
import {LoadingController, NavController, ToastController} from "@ionic/angular";
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

  paymentAmount = '12';
  currency: string = 'EUR';
  currencyIcon: string = '€';

  constructor(private afAuth: AngularFireModule,
              private loadingCtrl: LoadingController,
              private firestore: AngularFirestore,
              private payPal: PayPal,
              private servicioCheck: ServicioCheckService,
              private navCtrl: NavController,
              private carro: CarroService,
              private toastCtrl: ToastController
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
                          //alert('Transaction completed by ' + details.payer.name.given_name + '!');
                          _this.setPedido("Completed", "Completado");
                      })
                      .catch(err => {
                          console.log(err);
                          _this.setPedido("Error", "Cancelado");
                      })
              }
          }).render('#paypal-button-container');
      }, 500)
  }

  ngOnInit() {
    //this.cliente = firebase.auth().currentUser; --> Sería lo correcto pero da muchos fallos.
    //this.cliente = this.servicioCheck.getClientId();
    this.cliente = 'FFG3a1BB6KelSirb435YUDTpNjP2';
    if (this.cliente != null){
      this.getUserById(this.cliente);
      console.log("Si está aquí -> " + this.cliente);
    }else{
      console.log("No se han podido recuperar las credenciales");
    }
    this.paymentAmount = this.carro.getPrecio().toString();
    this.direccion = this.servicioCheck.getDireccion();
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


  //Esta versión sólo sirve para aplicaciones android nativas.
  /*payWithPaypal() {
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
  }*/

  setPedido(mensaje: string, estado: string){
      console.log("Funciona setpedido "+ mensaje + ' --> '+ estado);
      this.makeOrder(estado);
      this.servicioCheck.setMessage(mensaje);
      this.servicioCheck.setOrder(this.order);
      //this.createOrder(this.order);
      console.log (this.servicioCheck.getMessage());
      this.navCtrl.navigateRoot('finish-pay');
  }

 makeOrder(estado: string){
      console.log("Funciona makeorder" + this.direccion);
      this.order.user = this.user.name + " " + this.user.surname;
      this.order.date = new Date();
      this.order.products = this.carro.getArrayProducts();
      this.order.price = this.carro.getPrecio();
      this.order.address = this.direccion;
      this.order.estado = estado;
  }

   async createOrder(order: Order) {
        // show loader
        const loader = this.loadingCtrl.create({
            message: 'Please wait...'
        });
        (await loader).present();
        try {
        await this.firestore.collection('orders').add(order);
        } catch (e) {
            this.showToast(e);
        }

        // dismiss loader
        (await loader).dismiss();

        // redirect to finish-pay page
        this.navCtrl.navigateRoot('finish-pay');
    }



    showToast(message: string) {
        this.toastCtrl.create({
            message,
            duration: 3000
        }).then(toastData => toastData.present());
    }
}
