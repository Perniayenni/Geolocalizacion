import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UbicacionProvider} from '../../providers/ubicacion/ubicacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat:any = -33.44368;
  lg:any = -70.6661439;
  zoom:number= 12;

  constructor(public navCtrl: NavController, public ubicacion:UbicacionProvider) {
    this.ubicacion.iniciar_ubicacion();
  }

}
