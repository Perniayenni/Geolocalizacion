import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estacionamiento, Horarios } from '../../app/clases/index';
import { UbicacionProvider } from '../ubicacion/ubicacion';

/*
  Generated class for the EstacionamientosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EstacionamientosProvider {
  public estacionamientos:Estacionamiento[] = [];
  public horariosSe:Horarios[] = [];

  constructor(public http: HttpClient, public ubicacion:UbicacionProvider) {
    console.log('Hello EstacionamientosProvider Provider');
  }

  // variables de distancia
  urlMatrizDis:string='https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='
  keyMAtriz:string='&key=AIzaSyDgrCp-pG6XoB_V0ENiDmYtNgTUpGf4wVs';

  datosRes:any = [];
  datosResHorario:any = [];

  //urlEstacionamiento:string= 'http://localhost:8000/estacionamiento';
  //urlHorarios:string= 'http://localhost:8000/horarios';
  urlMatriz:string = 'http://apiestacionamientos.ourproject.cl/public/matriz';
  urlEstacionamiento:string= 'http://apiestacionamientos.ourproject.cl/public/estacionamiento';
  urlHorarios:string= 'http://apiestacionamientos.ourproject.cl/public/horarios';

  obtenerEstacionamientos(){
    this.estacionamientos = [];
    return this.http.get(this.urlEstacionamiento)
      .subscribe( data => {
        this.datosRes = data;
        for (let res of this.datosRes){
          this.obtenerHorarios(res.id_es)
            .subscribe(datos=>{
              this.datosResHorario = datos;
              for (let res1 of this.datosResHorario){
                this.horariosSe.push(res1);
              }

              res.horarios = this.horariosSe;
              this.estacionamientos.push(res);
              this.horariosSe = [];
            });
        }
        console.log(this.estacionamientos);
      }
      );
  }

  obtenerHorarios(id){
    let url = this.urlHorarios+'/'+id;
    return this.http.get(url);
  }

/*  agregarDistancia(){
    let datosResp;
    for(let estcmto of this.estacionamientos){
      this.obtenetDistancia(estcmto.lt, estcmto.lng)
        .subscribe(data =>{
          datosResp = data.rows;
          for (let res1 of datosResp){
            for(let res2 of res1.elements){
              estcmto.duracion = res2.duration.text;
              estcmto.valorDurac = res2.duration.value;
            }
          }
        });
    }
  }
*/
  obtenetDistancia(lt, lng){
    let headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    let datos= {
      urlCreada : this.urlMatrizDis+this.ubicacion.lt+','+this.ubicacion.lng+'&destinations='+lt+','+lng+this.keyMAtriz
    };
    return this.http.post(this.urlMatriz, datos, {headers});
  }
}
