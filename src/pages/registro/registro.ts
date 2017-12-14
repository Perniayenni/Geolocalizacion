import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { UsuarioProvider} from '../../providers/usuario/usuario';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  rut:string='';
  nombre:string='';
  apellido:string= '';
  contrasena:string='';
  correo:string = '';

  login:any = LoginPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public _us:UsuarioProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  guardar() {
    if (this.rut == '' || this.nombre == '' || this.apellido == '' || this.contrasena == '' || this.correo == '') {
      let alert = this.alertCtrl.create({
        subTitle: 'Debe llenar todos los datos',
        buttons: ['OK']
      });
      alert.present();
    } else if (!this.validarut(this.rut)) {
      let alert = this.alertCtrl.create({
        subTitle: 'Rut Invalido',
        buttons: ['OK']
      });
      alert.present();
    }else if (!this.validarEmail(this.correo)){
        let alert = this.alertCtrl.create({
          subTitle: 'Correo Invalido',
          buttons: ['OK']
        });
        alert.present();
    }else{
      let loader = this.loadingCtrl.create({
        content: "Espere porfavor"
      });
      loader.present();

      let datos = {
        "rut": this.rut,
        "nombre": this.nombre,
        "apellido": this.apellido,
        "correo": this.correo,
        "contrasena": this.contrasena,
        "fechaCreacion": new Date().toJSON().slice(0, 10)

      }
      this._us.guardarUsuario(datos)
        .subscribe(data=>{
          loader.dismissAll();
          console.log(data);

          if(data == null){
            let alert = this.alertCtrl.create({
              subTitle: 'Rut ya éxiste',
              buttons: ['OK']
            });

            alert.present();
          }else if (data == true){
            let alert = this.alertCtrl.create({
              subTitle: 'Usuario Guardado',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.setRoot(this.login);
          }
        })
    }
  }

  verificarEntrada() {
    let rut1 = this.rut;
    let rut2 = rut1.split('.').join('');
    let rut = rut2.split('-').join('');
    let sRut1 = rut;      // contador de para saber cuando insertar el . o la -
    let nPos = 0; // Guarda el rut invertido con los puntos y el guión agregado
    let sInvertido = ''; // Guarda el resultado final del rut como debe ser
    let sRut = '';
    for (var i = sRut1.length - 1; i >= 0; i-- ) {
      sInvertido += sRut1.charAt(i);
      if (i == sRut1.length - 1 )
        sInvertido += '-';
      else if (nPos == 3)
      {
        sInvertido += '.';
        nPos = 0;
      }
      nPos++;
    }
    for(var j = sInvertido.length-1; j>=0; j-- )
    {
      if (sInvertido.charAt(sInvertido.length - 1) != '.')
        sRut += sInvertido.charAt(j);
      else if (j != sInvertido.length - 1 )
        sRut += sInvertido.charAt(j);
    }
    // Pasamos al campo el valor formateado
    this.rut= sRut;
  }

  validarut(rut) {
    let tmpstr = '';
    let largo;
    let i;
    let j;
    let cnt;
    for ( i=0; i < rut.length ; i++ )
      if ( rut.charAt(i) != ' ' && rut.charAt(i) != '.' && rut.charAt(i) != '-' )
        tmpstr = tmpstr + rut.charAt(i);
    rut = tmpstr;
    largo = rut.length;
    // [VARM+]
    tmpstr = "";
    for ( i=0; rut.charAt(i) == '0' ; i++ );
    for (; i < rut.length ; i++ )
      tmpstr = tmpstr + rut.charAt(i);
    rut = tmpstr;
    largo = rut.length;
    // [VARM-]
    if ( largo < 2 ){
      return false;
    }
    for (i=0; i < largo ; i++ ){
      if ( rut.charAt(i) != "0" && rut.charAt(i) != "1" && rut.charAt(i) !="2" && rut.charAt(i) != "3" && rut.charAt(i) != "4" && rut.charAt(i) !="5" && rut.charAt(i) != "6" && rut.charAt(i) != "7" && rut.charAt(i) !="8" && rut.charAt(i) != "9" && rut.charAt(i) !="k" && rut.charAt(i) != "K" ){
        return false;
      }
    }
    let invertido = "";
    for ( i=(largo-1),j=0; i>=0; i--,j++ )
      invertido = invertido + rut.charAt(i);
    var drut = "";
    drut = drut + invertido.charAt(0);
    drut = drut + '-';
    cnt = 0;
    for ( i=1,j=2; i<largo; i++,j++ ){
      if ( cnt == 3 ){
        drut = drut + '.';
        j++;
        drut = drut + invertido.charAt(i);
        cnt = 1;
      }
      else{
        drut = drut + invertido.charAt(i);
        cnt++;
      }
    }
    invertido = "";
    for ( i=(drut.length-1),j=0; i>=0; i--,j++ )
      invertido = invertido + drut.charAt(i);
    if ( this.comprueba_dv(rut) )
      return true;
    return false;
  }

  comprueba_dv( crut ) {
    let largo;
    let rut;
    let dv;
    let suma;
    let mul;
    let dvr;
    let dvi;
    let res;
    let i;
    largo = crut.length;
    if ( largo < 2 ){
      return false;
    }
    if ( largo > 2 )
      rut = crut.substring(0, largo - 1);
    else
      rut = crut.charAt(0);
    dv = crut.charAt(largo-1);
    this.comprueba_cdv( dv );
    if ( rut == null || dv == null )
      return 0;
    dvr = '0';
    suma = 0;
    mul = 2;
    for (i= rut.length -1 ; i >= 0; i--){
      suma = suma + rut.charAt(i) * mul;
      if (mul == 7)
        mul = 2;
      else
        mul++;
    }
    res = suma % 11;
    if (res==1)
      dvr = 'k';
    else
    if (res==0)
      dvr = '0';
    else{
      dvi = 11-res;
      dvr = dvi + "";
    }
    if ( dvr != dv.toLowerCase() ){
      return false;
    }
    return true;
  }

  comprueba_cdv( dvr ) {
    let dv;
    dv = dvr + '';
    if ( dv != '0' && dv != '1' && dv != '2' && dv != '3' && dv != '4' && dv != '5' && dv != '6' && dv != '7' && dv != '8' && dv != '9' && dv != 'k'  && dv != 'K'){
      return false;
    }
    return true;
  }

  validarEmail(valor) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
      return true;
    } else {
      return false;
    }
  }
}
