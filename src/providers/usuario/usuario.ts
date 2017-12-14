import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase/app';
import {AngularFireModule} from 'angularfire2';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class UsuarioProvider {

  urlUsuarios:string = 'http://apiestacionamientos.ourproject.cl/public/usuarios';

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
}
