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
  public listado=[];
  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth, public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.firestore.collection('products').valueChanges().subscribe(productList => {
      this.productList = productList;
      this.loadedProductList = productList;
    });
  }

  initializeItems(): void {
    this.productList = this.loadedProductList;
  }

  filterList(event) {
    this.initializeItems();
    const searchTerm = event.srcElement.value;
    if (!searchTerm) {
      return;
    }
    this.productList = this.productList.filter(currentProduct => {
      if (currentProduct.name && searchTerm) {
        if (currentProduct.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  categorizar(input:String){
    if(this.listado.includes(input)){
      this.listado = this.listado.filter(function(value, index, arr){ return value != input;});
    }else{
      this.listado.push(input);
    }
    if(this.listado.length==0){
      this.productList=this.loadedProductList;
      return;
    }
    var res=[];
    for(var product of this.loadedProductList){
      if(this.listado.includes(product.type)){
        res.push(product);
      }
    }
    this.productList=res;
  }

}
