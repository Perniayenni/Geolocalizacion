import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';
import {AngularFireModule} from 'angularfire2';
import { GooglePlus } from '@ionic-native/google-plus';
import { HomePage } from '../../pages/home/home';

@Injectable()
export class UsuarioProvider {

  SessioStart: boolean = false;
  Token:string;
  IdUsuario:number;
  urlUsuarios:string = 'http://apiestacionamientos.ourproject.cl/public/usuarios';
  urlLogin:string = 'http://apiestacionamientos.ourproject.cl/public/login';
  home:any = HomePage;
  datosRec:any;

  constructor(public afAuth: AngularFireAuth,
              public gplus:GooglePlus,
              public http: HttpClient) {
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
      'usuario' : usuario,
      'contrasena' : contrasena
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.urlLogin, body, { headers })
      .map(data => {
        this.datosRec= data;
        if (data != false){
          for (let res of this.datosRec)
          {
            this.Token = res.token;
            this.IdUsuario = res.id_login;

          }
          this.SessioStart = true;
          this.guardarStorage();
        }
        return this.datosRec;
      });
  }


  private guardarStorage() {
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

    public cargarStorage() {
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
}
