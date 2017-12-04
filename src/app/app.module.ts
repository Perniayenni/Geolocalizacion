import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ModalCercanosPage} from '../pages/modal-cercanos/modal-cercanos';

import { Geolocation } from '@ionic-native/geolocation';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';

// Mapas
import { AgmCoreModule } from '@agm/core';
import { EstacionamientosProvider } from '../providers/estacionamientos/estacionamientos';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalCercanosPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDgrCp-pG6XoB_V0ENiDmYtNgTUpGf4wVs'
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalCercanosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    UbicacionProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EstacionamientosProvider,


  ]
})
export class AppModule {}
