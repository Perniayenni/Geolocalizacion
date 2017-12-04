import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EstacionamientosProvider } from '../../providers/estacionamientos/estacionamientos';

/**
 * Generated class for the ModalCercanosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modal-cercanos',
  templateUrl: 'modal-cercanos.html',
})
export class ModalCercanosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public servEs:EstacionamientosProvider,
              public viewCtrl:ViewController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalCercanosPage');
  }

}
