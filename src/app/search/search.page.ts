import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController, NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public productList: any[];
  public loadedProductList: any[];
  public searchItem: String;
  public listado=[];
  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth, public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.firestore.collection('products').valueChanges().subscribe(productList => {
      this.productList = productList;
      this.loadedProductList = productList;
    });
    this.searchItem ="";
  }
  categorizar(input:String){
    if(this.listado.includes(input)){
      this.listado = this.listado.filter(function(value, index, arr){ return value != input;});
    }else{
      this.listado.push(input);
    }
    this.busqueda();
  }
  busqueda(){
    console.log(this.searchItem);
    var res=[];
    for(var product of this.loadedProductList){
      if(this.listado.length==0 && product.name.toLowerCase().includes(this.searchItem)){
        res.push(product);
      }else if(this.listado.includes(product.type) && product.name.toLowerCase().includes(this.searchItem)){
        res.push(product);
      }
    }
    this.productList=res;
  }
}
