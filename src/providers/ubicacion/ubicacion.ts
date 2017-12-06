import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Geocoder,
  GeocoderRequest,
  GeocoderResult,
} from '@ionic-native/google-maps';
import { Toast } from '@ionic-native/toast';

import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
/*
  Generated class for the UbicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbicacionProvider {

  constructor(private geolocation: Geolocation,
              private googleMaps: GoogleMaps,
              private geocoder: Geocoder,
              private toast: Toast,
              private nativeGeocoder: NativeGeocoder) {
    console.log('Hello UbicacionProvider Provider');
  }
  lt:any;
  lng:any;
  data:any;

  iniciar_ubicacion(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
   this.data= data;
   this.lt = this.data.coords.latitude;
   this.lng = this.data.coords.longitude;
      console.log(this.lt, this.lng);
      console.log(this.data);
      // this.getDirecion(this.lt, this.lng);
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  getDirecion(lat, lng){
    this.nativeGeocoder.reverseGeocode(lat, lng)
      .then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
      .catch((error: any) => console.log(error));
  }
  doGeocode(lat, lng) {
    let request: GeocoderRequest = {
      position: new LatLng(lat, lng)
    };

    console.log(request);
    this.geocoder.geocode(request)
       .then((results) => {
      console.log(results);
        /* let address = [
           (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ""),
           results[0].locality
         ].join(", ");
         console.log("data_: ", address);*/
       });
  }
}
