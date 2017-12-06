import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import {UbicacionProvider} from '../../providers/ubicacion/ubicacion';
import {EstacionamientosProvider} from '../../providers/estacionamientos/estacionamientos';
import {ModalCercanosPage} from '../modal-cercanos/modal-cercanos';
import {MapTypeStyle} from "@agm/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat:any = -33.44368;
  lg:any = -70.6661439;
  zoom:number= 14;
  rotate:boolean=true;

   styles =
     [
       {
         "featureType": "poi.attraction",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "poi.business",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "poi.government",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "poi.medical",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "poi.park",
         "elementType": "labels.text",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "poi.place_of_worship",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "poi.school",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       },
       {
         "featureType": "poi.sports_complex",
         "stylers": [
           {
             "visibility": "off"
           }
         ]
       }
     ];



  constructor(public navCtrl: NavController,
              public ubicacion:UbicacionProvider,
              public servEs:EstacionamientosProvider,
              public loadingCtrl: LoadingController,
              public  modalCtrl : ModalController) {
    this.ubicacion.iniciar_ubicacion();
  }


  obtenerCercas(){
    let promesa = new Promise((resolve, reject)=>{


    });
    return promesa

  }

  obtenerEsCerca(){
 // this.servEs.agregarDistancia();
    /*let loading = this.loadingCtrl.create({
    });
    loading.present();*/
    let resDatos;
    let datosResp;
    let numAreglo = this.servEs.estacionamientos.length;
    let i = 0;
    console.log(numAreglo);
    for(let estcmto of this.servEs.estacionamientos){
      i= i+1;
      this.servEs.obtenetDistancia(estcmto.lt, estcmto.lng)
        .subscribe(data =>{
          resDatos= data;
          datosResp = resDatos.rows;
          for (let res1 of datosResp){
            for(let res2 of res1.elements){
              estcmto.duracion = res2.duration.text;
              estcmto.valorDurac = res2.duration.value;
              // Ordenamos Arreglo
              this.servEs.estacionamientos.sort(function (a, b) {
                if (a.valorDurac > b.valorDurac) {
                  return 1;
                }
                if (a.valorDurac < b.valorDurac) {
                  return -1;
                }
                // a must be equal to b
                return 0;
              })
            }
          }
        });
    }

      this.modalCtrl.create(ModalCercanosPage).present();



    //console.log(this.servEs.estacionamientos);
    //this.modalCtrl.create(ModalCercanosPage).present();
  }

  ConvertString(value){
    return parseFloat(value)
  }

}
