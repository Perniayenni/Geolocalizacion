import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  GeocoderRequest,
  GeocoderResult,
  Geocoder,
} from '@ionic-native/google-maps';
import {NativeGeocoder, NativeGeocoderReverseResult} from "@ionic-native/native-geocoder";

//import { Toast } from '@ionic-native/toast';

//import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

/*
  Generated class for the UbicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbicacionProvider {

  constructor(private geolocation: Geolocation,
              private googleMaps: GoogleMaps,
            //  private toast: Toast,
             private nativeGeocoder: NativeGeocoder
              ) {
    //console.log('Hello UbicacionProvider Provider');
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
     // this.doGeocode(this.lt, this.lng);
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
  getDirecion(lat, lng) {
    this.nativeGeocoder.reverseGeocode(-33.4448057, 70.6461855)
      .then((result: NativeGeocoderReverseResult) =>{
        console.log(JSON.stringify(result));
      }).catch((error: any) => console.log(error));
  }
  doGeocode(lat, lng) {
    let request: GeocoderRequest = {
      position: new LatLng(52.5072095, 13.1452818)
    };

    console.log(request);
    Geocoder.geocode(request)
       .then((results: GeocoderResult) => {
      console.log('estoy dentro de');
      console.log(JSON.stringify(results));
        /* let address = [
           (results[0].thoroughfare || "") + " " + (results[0].subThoroughfare || ""),
           results[0].locality
         ].join(", ");
         console.log("data_: ", address);*/
       });
  }
}
