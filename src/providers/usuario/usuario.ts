import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';
import { HomePage } from '../../pages/home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import {Platform} from "ionic-angular";


@Injectable()
export class UsuarioProvider {

  SessioStart: boolean = false;
  Token:string='';
  IdUsuario:number;
  urlUsuarios:string = 'http://apiestacionamientos.ourproject.cl/public/usuarios';
  urlLogin:string = 'http://apiestacionamientos.ourproject.cl/public/login';
  home:any = HomePage;
  datosRec:any;

  constructor(public afAuth: AngularFireAuth,
              public gplus:GooglePlus,
              public http: HttpClient,
              private nativeStorage: NativeStorage,
              private platform: Platform) {
  }
  login() {
    this.gplus.login({
      'webClientId':'151231489618-fqjeq5n7krubv4dqj2drh92kl7nmdb4j.apps.googleusercontent.com',
      'offline':true
    }).then(res =>{
      console.log(JSON.stringify(res));
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suc =>{
          console.log(suc);
          alert('login sec')
        }).catch(ns=>{
          alert('not Suc')
      })
    })
    //this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  guardarUsuario(Objeto){
    console.log(Objeto);
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });

    return this.http.post(this.urlUsuarios, Objeto, {headers})
      .map(data=>{
        return data;
      });
  }

  ObtenerUsuario(usuario, contrasena){
    let body = {
      'correo' : usuario,
      'contrasena' : contrasena
    }
    console.log(body);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.urlLogin, body, { headers })
      .map(data => {
        this.datosRec= data;
        if (this.datosRec != null){
          for (let res of this.datosRec)
          {
            this.Token = res.token;
            this.IdUsuario = res.id_us;

          }
          this.SessioStart = true;
          this.guardarStorage();
        }
        return this.datosRec;
      });
  }


  private guardarStorage() {
    if (this.platform.is("cordova")){
      this.nativeStorage.setItem("variableSession", this.SessioStart);


    }else{
      if (this.Token){
        localStorage.setItem('variableSession', JSON.stringify(this.SessioStart));
        localStorage.setItem('Token', JSON.stringify(this.Token));
        localStorage.setItem('idUsuario', JSON.stringify(this.IdUsuario));
      }else{
        localStorage.removeItem('Token');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('variableSession');
      }
    }

  }

    public cargarStorage() {

    let promesa = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")){
        this.nativeStorage.getItem('variableSession')
          .then(session=>{
            this.SessioStart= session;
            resolve();
          })
      }else{
        if (localStorage.getItem('Token')){
          this.SessioStart = JSON.parse(localStorage.getItem('variableSession'));
          this.Token = JSON.parse(localStorage.getItem('Token'));
          this.IdUsuario  = JSON.parse(localStorage.getItem('idUsuario'));
        }else {
          this.SessioStart = false;
          this.IdUsuario = null;
          this.Token = null;
        }

      }
      resolve();
    })
      return promesa;

  }

  sessionOff() {
    let promesa = new Promise((resolve, reject) =>{
      this.SessioStart= false;
      this.Token = null;
      this.IdUsuario = null;
      this.limpiarStorage();
      resolve();
    })
    return promesa
  }

  limpiarStorage(){
    if (this.platform.is("cordova")) {
      this.nativeStorage.clear();
    } else {
      localStorage.clear();
    }
  }
}
