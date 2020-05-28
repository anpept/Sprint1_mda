import { Component } from '@angular/core';
import {LoadingController, ToastController, NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-find-us',
  templateUrl: './find-us.page.html',
  styleUrls: ['./find-us.page.scss'],
})
export class FindUsPage {
  map: any;
  marker: any;
  latitude: any = '';
  longitude: any = '';
  timestamp: any = '';
  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public platform: Platform, public geolocation: Geolocation) {
    this.platform.ready().then(() => {
      const mapOptions = {
        center: {lat: 23.2366, lng: 79.3822},
        zoom: 7
      }
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      this.getLocation();
    });
  }

  getLocation() {
    const ref = this;
    const watch = this.geolocation.watchPosition();
    watch.subscribe((position) => {
      const gps = new google.maps.LatLng
      (position.coords.latitude, position.coords.longitude);
      if (ref.marker == null) {
        ref.marker = new google.maps.Marker({
          position: gps,
          map: ref.map,
          title: 'my position'
        });
      } else {
        ref.marker.setPosition(gps);
      }
      ref.map.panTo(gps);
      ref.latitude = position.coords.latitude.toString();
      ref.longitude = position.coords.longitude.toString();
      ref.timestamp = (new Date(position.timestamp)).toString();
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.navCtrl.navigateRoot('login');
    });
  }
}
