import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider} from '../../providers/usuario/usuario';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public usuario:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public provUsuario:UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ingresar(proveedor:string){
    this.provUsuario.login();
  }
}
