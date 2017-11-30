import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UbicacionProvider} from '../../providers/ubicacion/ubicacion';
import {EstacionamientosProvider} from '../../providers/estacionamientos/estacionamientos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat:any = -33.44368;
  lg:any = -70.6661439;
  zoom:number= 16;

  id_hor:number;

  constructor(public navCtrl: NavController,
              public ubicacion:UbicacionProvider,
              public servEs:EstacionamientosProvider) {
    this.ubicacion.iniciar_ubicacion();
    this.servEs.obtenerEstacionamientos();
  }

}
