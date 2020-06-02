import { Component } from '@angular/core';
import {LoadingController, ToastController, NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import { CarroService } from '../carro.service';
import * as firebase from 'firebase';
import {ServicioCheckService} from "../checkout/servicio-check.service";

@Component({
  selector: 'app-home',
  templateUrl: 'carro.page.html',
  styleUrls: ['carro.page.scss'],
})
export class CarroPage {
  users: any;
  products;
  cantidades;
  total:number=0;
  direccion: string;

  constructor(
      public afAuth: AngularFireAuth,
      public navCtrl: NavController,
      private carro: CarroService,
      private servicioCheck: ServicioCheckService) {
      }
      ngOnInit() {
        this.products=this.carro.getProducts();
        this.cantidades=this.carro.getCantidades();
      }
  ionViewWillEnter() {
    
    this.products=this.carro.getProducts();
    this.cantidades=this.carro.getCantidades();
    this.precioTotal();
  }
  // logout
  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }
  precioTotal(){
    var total=0;
    for(let indice=0;indice<this.products.length;indice++){
      total+=this.cantidades[indice]*this.products[indice].price;
    }
    this.total=total;
    this.carro.setPrecio(this.total);
  }
  anadirCantidad(i:number){
    this.cantidades[i]++;
    this.precioTotal();
    this.carro.setCantidades(this.cantidades);
  }
  restarCantidad(i:number){
    if(this.cantidades[i]==1){
      if (confirm("Se eliminara el producto. ¿Desea eliminar el producto)?")) {
        alert("El producto fue eliminado del carrito");
        this.products.splice(i,1);
        this.cantidades.splice(i,1);
      }else {
        
      }
    }else{
      this.cantidades[i]--;
    }
    this.precioTotal();
    this.carro.setCantidades(this.cantidades);
    this.carro.setProducts(this.products);
  }

  goToCheckout(){
    if (this.addressValidator()){
      console.log(this.direccion);
      this.servicioCheck.setDireccion(this.direccion);
      console.log(this.servicioCheck.getDireccion());
      this.navCtrl.navigateRoot('checkout');
      this.servicioCheck.setPrecio(this.total.toFixed(2));
    }
  }

  addressValidator() {
    if (!this.direccion) {
      this.showToast('Enter a shipping address');
      return false;
    }
    return true;
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000
    }).then(toastData => toastData.present());
  }
}
