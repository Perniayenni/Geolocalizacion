import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  {EstacionamientosProvider} from '../providers/estacionamientos/estacionamientos';
import { HomePage } from '../pages/home/home';
import { LoginPage} from '../pages/login/login';
import { UsuarioProvider} from '../providers/usuario/usuario';
import {UbicacionProvider} from "../providers/ubicacion/ubicacion";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public servEs:EstacionamientosProvider,
              public ubicacion:UbicacionProvider,
              public _us:UsuarioProvider) {
    platform.ready().then(() => {
      this._us.cargarStorage()
        .then(()=>{
        console.log('se cargo el storage y es '+ this._us.SessioStart)
          if(this._us.SessioStart){
            this.servEs.obtenerEstacionamientos();
            this.ubicacion.iniciar_ubicacion();
            this.rootPage = HomePage;
          }else
            if (!this._us.SessioStart){
            this.rootPage = LoginPage;
              this.servEs.obtenerEstacionamientos();
              this.ubicacion.iniciar_ubicacion();
          }
          statusBar.styleDefault();
          splashScreen.hide();
        });
    });

  }
}

