import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  {EstacionamientosProvider} from '../providers/estacionamientos/estacionamientos';
import { HomePage } from '../pages/home/home';
import { LoginPage} from '../pages/login/login';
import { UsuarioProvider} from '../providers/usuario/usuario';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  login:any=LoginPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public servEs:EstacionamientosProvider,
              public _us:UsuarioProvider) {
    platform.ready().then(() => {
      this.servEs.obtenerEstacionamientos();
      this._us.cargarStorage()
        .then(()=>{
          if(this._us.SessioStart){
            this.rootPage = HomePage;
          }else{
            this.rootPage = LoginPage;
          }
          statusBar.styleDefault();
          splashScreen.hide();
        });
    });

  }
}

