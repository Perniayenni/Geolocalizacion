import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estacionamiento, Horarios } from '../../app/clases/index';

/*
  Generated class for the EstacionamientosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EstacionamientosProvider {

  public estacionamientos:Estacionamiento[] = [];
  public horariosSe:Horarios[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello EstacionamientosProvider Provider');
  }

  urlEstacionamiento:string= 'http://localhost:8000/estacionamiento';
  urlHorarios:string= 'http://localhost:8000/horarios';

  obtenerEstacionamientos(){
    this.estacionamientos = [];
    return this.http.get(this.urlEstacionamiento)
      .subscribe( data => {
        for (let res of data){
          this.obtenerHorarios(res.id_es)
            .subscribe(datos=>{
              for (let res1 of datos){
                this.horariosSe.push(res1);
              }
              let DatosEs = {
                id_es: res.id_es,
                nombreEs: res.nombreEs,
                direccion: res.direccion,
                lt: res.lt,
                lng: res.lng,
                capacidad: res.capacidad,
                tipoEs: res.tipoEs,
                alturaMaxima: res.alturaMaxima,
                horarios: this.horariosSe
              }
              this.estacionamientos.push(DatosEs);
              this.horariosSe = [];
            });
        }
        console.log('desde servicios');
        console.log(this.estacionamientos);
      }
      );
  }

 obtenerHorarios(id){
    let url = this.urlHorarios+'/'+id;
    return this.http.get(url);
  }
}
