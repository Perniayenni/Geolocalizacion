import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import {UbicacionProvider} from '../../providers/ubicacion/ubicacion';
import {EstacionamientosProvider} from '../../providers/estacionamientos/estacionamientos';
import {ModalCercanosPage} from '../modal-cercanos/modal-cercanos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat:any = -33.44368;
  lg:any = -70.6661439;
  zoom:number= 14;

  id_hor:number;

  constructor(public navCtrl: NavController,
              public ubicacion:UbicacionProvider,
              public servEs:EstacionamientosProvider,
              public loadingCtrl: LoadingController,
              public  modalCtrl : ModalController) {
    this.ubicacion.iniciar_ubicacion();
  }

  obtenerEsCerca(){
 // this.servEs.agregarDistancia();
    let datosResp;
    for(let estcmto of this.servEs.estacionamientos){
      this.servEs.obtenetDistancia(estcmto.lt, estcmto.lng)
        .subscribe(data =>{
          datosResp = data.rows;
          console.log(datosResp);
          for (let res1 of datosResp){
            for(let res2 of res1.elements){
              estcmto.duracion = res2.duration.text;
              estcmto.valorDurac = res2.duration.value;
            }
          }
        });
    }
    console.log(this.servEs.estacionamientos);
    this.modalCtrl.create(ModalCercanosPage).present();
  }

  ConvertString(value){
    return parseFloat(value)
  }

}
