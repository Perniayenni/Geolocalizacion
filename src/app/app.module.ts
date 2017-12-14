import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ModalCercanosPage} from '../pages/modal-cercanos/modal-cercanos';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';

import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { EstacionamientosProvider } from '../providers/estacionamientos/estacionamientos';
import { UsuarioProvider } from '../providers/usuario/usuario';


// Mapas
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, Geocoder } from '@ionic-native/google-maps';
import { Toast } from '@ionic-native/toast';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {firebaseConfig} from '../config/firebase.config';

import { GooglePlus } from '@ionic-native/google-plus';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalCercanosPage,
    LoginPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgrCp-pG6XoB_V0ENiDmYtNgTUpGf4wVs'
    }),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalCercanosPage,
    LoginPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    Geocoder,
    Toast,
    NativeGeocoder,
    UbicacionProvider,
    UsuarioProvider,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EstacionamientosProvider,



  ]
})
export class AppModule {}
