import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';
import {Platform} from "ionic-angular";
import { Facebook } from '@ionic-native/facebook';
import {Insomnia} from "@ionic-native/insomnia";

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
              private storage: Storage,
              private platform: Platform,
              private facebook:Facebook,
              private insomnia: Insomnia) {
  }
  noDormir(){
    this.insomnia.keepAwake()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
  }

  dormirDenuevo(){

  }
  login() {
    let promesa = new Promise((resolve, reject) =>{
      this.gplus.login({
        'webClientId':'151231489618-fqjeq5n7krubv4dqj2drh92kl7nmdb4j.apps.googleusercontent.com',
        'offline':true
      }).then(res =>{
        console.log(JSON.stringify(res));
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then(suc =>{
            let datos={
              "nombre": res.givenName,
              "apellido": res.familyName,
              "correo": res.email,
              "conrasena":'123',
              "fechaCreacion": new Date().toJSON().slice(0, 10)
            }
            this.ObtenerUsuario(datos.correo, datos.conrasena).subscribe(datass=>{
              this.datosRec= datass;
              if (this.datosRec != null){
                for (let res of this.datosRec)
                {
                  this.IdUsuario = res.id_us;

                }
                this.SessioStart = true;
                this.guardarStorage();
              }else{
                this.guardarUsuario(datos).subscribe(dat=>{
                  this.SessioStart = true;
                  this.guardarStorage();

                });
              }
              resolve();
            });


          }).catch(ns=>{
          reject();
        })
      }).catch(ns=>{
        reject();
      })
    } )

    return promesa;

    //this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }

  /* logout() {
    this.afAuth.auth.signOut();
  }*/

 fblogin(){
   let promesa = new Promise((resolve, reject) =>{
     this.facebook.login(['email', 'public_profile'])
       .then(res=>{
         const fc= firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
         firebase.auth().signInWithCredential(fc).then(fs=>{
           console.log(JSON.stringify(fs));
           let datos={
             "nombre": fs.displayName,
             "apellido": 'sN',
             "correo": fs.email,
             "conrasena":'123',
             "fechaCreacion": new Date().toJSON().slice(0, 10)
           }
           this.ObtenerUsuario(datos.correo, datos.conrasena).subscribe(datass=>{
             this.datosRec= datass;
             if (this.datosRec != null){
               for (let res of this.datosRec)
               {
                 this.IdUsuario = res.id_us;

               }
               this.SessioStart = true;
               this.guardarStorage();
             }else{
               this.guardarUsuario(datos).subscribe(dat=>{
                 this.SessioStart = true;
                 this.guardarStorage();

               });
             }
             resolve();
           });
         }).catch(err=>{
           reject();
         })
       }).catch(err=>{
       reject();
     })
   })
   return promesa;
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
    let  promesa = new Promise((resolve, reject) => {
      if (this.platform.is('cordova')){
        this.storage.set('variableSession', JSON.stringify(this.SessioStart));
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
    });
    return promesa;
  }

  public cargarStorage() {

    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')){
        return this.storage.ready()
          .then(()=>{
            this.storage.get('variableSession')
              .then((session)=>{
                this.SessioStart= session;
                console.log("Cargando el storage SessionStart "+JSON.parse(session));
                resolve();
              })
          });
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
        resolve();
      }
    })
  }

  sessionOff() {
    let promesa = new Promise((resolve, reject) =>{
      this.SessioStart= false;
      this.Token = null;
      this.IdUsuario = null;
      this.limpiarStorage();
      this.gplus.logout();
      this.facebook.logout();
      this.dormirDenuevo();
      resolve();
    })
    return promesa
  }

  limpiarStorage(){
    if (this.platform.is("cordova")) {
      this.storage.clear();
    } else {
      localStorage.clear();
    }
  }
}
