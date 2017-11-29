import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the UbicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbicacionProvider {

  constructor(private geolocation: Geolocation) {
    console.log('Hello UbicacionProvider Provider');
  }
  ubicacion:any ={
      lt: -33.4554302,
      lg: -70.6502849
  }

  iniciar_ubicacion(){
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
   console.log(data);
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

}
