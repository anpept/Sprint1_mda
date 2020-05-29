import { Component } from '@angular/core';
import {LoadingController, ToastController, NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';


@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.page.html',
  styleUrls: ['./find-us.page.scss'],
})

export interface IGeometry {
  type: string;
  coordinates: number[];
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  properties?: any;
  $key?: string;
}

export class FindUsPage implements IGeoJson {
type = 'Feature';
geometry: IGeometry;
  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates
    };
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }
}

export class FeatureCollection {
  type = 'FeatureCollection'
  constructor(public features: Array<FindUsPage>) {}
}
