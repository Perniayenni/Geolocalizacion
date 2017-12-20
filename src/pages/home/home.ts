import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, MenuController, LoadingController, ModalController } from 'ionic-angular';
import {UbicacionProvider} from '../../providers/ubicacion/ubicacion';
import { UsuarioProvider} from '../../providers/usuario/usuario';
import {EstacionamientosProvider} from '../../providers/estacionamientos/estacionamientos';
import {ModalCercanosPage} from '../modal-cercanos/modal-cercanos';
import { LoginPage } from '../login/login';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker, LatLng
} from '@ionic-native/google-maps';
import { Insomnia } from '@ionic-native/insomnia';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat:any = -33.44368;
  lg:any = -70.6661439;
  zoom:number= 16;
  rotate:boolean=true;
  loginPage:any=LoginPage;

  opcionControzoom = {position:
    {TOP_CENTER : 2,
      LEFT_CENTER : 4,
      RIGHT_CENTER : 8,
      BOTTOM_CENTER : 11}}

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

  map: GoogleMap;
  constructor(public navCtrl: NavController,
              public ubicacion:UbicacionProvider,
              public servEs:EstacionamientosProvider,
              public loadingCtrl: LoadingController,
              public  modalCtrl : ModalController,
              private googleMaps: GoogleMaps,
              public platform:Platform,
              public menuCtrl:MenuController,
                public _us:UsuarioProvider) {
    this.ubicacion.iniciar_ubicacion();
    this._us.noDormir();
   /* this.platform.ready().then(()=>{
      this.loadMap();
    });*/
  }

  ionViewDidLoad(){
    //this.loadMap();
  }

  // Prueba de ionic

  loadMap(){
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // create CameraPosition
    let position: CameraPosition<any> = {
      target: new LatLng(this.ubicacion.lt, this.ubicacion.lng),
      zoom: 12,
      tilt: 30
    };

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      console.log('Map is ready!');

      // move the map's camera to position
      this.map.moveCamera(position);

    });
  }


  /*
  loadMap() {

    let element:HTMLElement = document.getElementById('map');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        this.getPosition();
      })
      .catch(error =>{
        console.log(error);
      });
  }

*/
  getPosition(): void{
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'My Position',
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error =>{
        console.log(error);
      });
  }


  // Prueba de Internet
  /*loadMap() {
    let element:HTMLElement = document.getElementById('map');

    let map:GoogleMap =this.googleMaps.create(element);

    map.one(GoogleMapsEvent.MAP_READY).then(
      ()=>{
        console.log('Map is ready');
      }
    );

    let ionic: LatLng = new LatLng(this.lat, this.lg);

    let position:CameraPosition<any> = {
      target:ionic,
      zoom: 18,
      tilt:30
    };

    map.moveCamera(position);

    let markerOptions:MarkerOptions ={
      position: ionic,
      title:'ionic'
    }

    map.addMarker(markerOptions)
      .then((marker:Marker)=>{
      marker.showInfoWindow();
      });
  }*/

  /*loadMaps(){
    let element:HTMLElement = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element);
    let latlng = new LatLng(this.lat, this.lg);
    map.one(GoogleMapsEvent.MAP_READY).then(()=>
    {
      let position: CameraPosition = {
        target: latlng,
        zoom: 18,
        tilt: 30
      }
      map.moveCamera(position);
    }
    );
  }*/

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

  cerrarSeccion(){
    this._us.sessionOff().then(()=>{
        this.navCtrl.setRoot(this.loginPage);
      }
    )

  }

}
