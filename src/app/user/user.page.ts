import { Component, OnInit } from '@angular/core';
import {LoadingController, ToastController, NavController} from '@ionic/angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  products: any;
  public productList: any[];
  public loadedProductList: any[];

  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth, public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
  }

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

  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }
  /*
  async getProducts() {
    // show loader
    const loader = this.loadingCtrl.create({
      message: 'Please wait...'
    });
    (await loader).present();

    try {
      this.firestore.collection('products').snapshotChanges().subscribe(data => {
        this.products = data.map(e => {
          return {
            id: e.payload.doc.id,
            name: e.payload.doc.data()['name'],
            type: e.payload.doc.data()['type'],
            price: e.payload.doc.data()['price'],
            imageURL: e.payload.doc.data()['imageURL']
          };
        });
      });

      // dismiss loader
      (await loader).dismiss();
    } catch (e) {
      this.showToast(e);
    }
  }

  showToast(message: string) {
    this.toastCtrl.create({
      message,
      duration: 3000
    }).then(toastData => toastData.present());
  }*/
}
