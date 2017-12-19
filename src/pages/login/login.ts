import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UsuarioProvider} from '../../providers/usuario/usuario';
import { RegistroPage } from '../registro/registro';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo:string='';
  contrasena:string;
  registro:any = RegistroPage;
  home:any= HomePage;

  public usuario:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public provUsuario:UsuarioProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ingresar(proveedor:string){
    if (proveedor == 'g'){
      let loader = this.loadingCtrl.create({
        content: "Espere porfavor"
      });
      loader.present();
      this.provUsuario.login().then(()=>{
        loader.dismissAll();
        this.navCtrl.setRoot(this.home);
      }).catch(()=>{
        loader.dismissAll();
        let alert = this.alertCtrl.create({
          subTitle: 'Se produjo un error al ingresar',
          buttons: ['OK']
        });

        alert.present();
      });
    }else
      if (proveedor == 'f'){
        let loader = this.loadingCtrl.create({
          content: "Espere porfavor"
        });
        loader.present();

        this.provUsuario.fblogin().then(()=>{
          loader.dismissAll();
          this.navCtrl.setRoot(this.home);
        }).catch(()=>{
          loader.dismissAll();
          let alert = this.alertCtrl.create({
            subTitle: 'Se produjo un error al ingresar',
            buttons: ['OK']
          });

          alert.present();
        });
      }

  }

  entrar(){
    let loader = this.loadingCtrl.create({
      content: "Espere porfavor"
    });
    loader.present();
    this.provUsuario.ObtenerUsuario(this.correo, this.contrasena)
      .subscribe(data =>{
        loader.dismissAll();
        console.log(data);
        if (data == null){
          let alert = this.alertCtrl.create({
            subTitle: 'Usuario no registrado',
            buttons: ['OK']
          });

          alert.present();
        }else
        {
            this.navCtrl.setRoot(this.home);
        }
      });
  }


}
