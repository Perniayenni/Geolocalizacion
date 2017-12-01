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
 /* public estacionamientos:Estacionamiento[] = [
    {
      id_es: 1,
      nombreEs: "Da conchimba",
      direccion: "serrano 76",
      lt: -33.4454635,
      lng: -70.6512245,
      capacidad: 100,
      tipoEs: "subterraneo",
      alturaMaxima: 3,
      disponibles: 100,
      horarios: this.horariosSe

    }];
  public horariosSe:Horarios[] = [
    {
      id_hor: 1,
      dias: "sab-dom",
      hora: "24 horas",
      maximoDiario: 200,
      montoPorHora: 200,
      montoPorMinuto: null,
      id_es: 1
    }
  ];*/

  constructor(public http: HttpClient) {
    console.log('Hello EstacionamientosProvider Provider');
  }

  datosRes:any = [];
  datosResHorario:any = [];
  urlEstacionamiento:string= 'http://localhost:8000/estacionamiento';
  urlHorarios:string= 'http://localhost:8000/horarios';

  //urlEstacionamiento:string= 'http://apiestacionamientos.ourproject.cl/public/estacionamiento';
  //urlHorarios:string= 'http://apiestacionamientos.ourproject.cl/public/horarios';

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
              /*
              let DatosEs:Estacionamiento = {
                'id_es': res.id_es,
                'nombreEs': res.nombreEs,
                'direccion': res.direccion,
                'lt': res.lt,
                'lng': res.lng,
                'capacidad': res.capacidad,
                'tipoEs': res.tipoEs,
                'alturaMaxima': res.alturaMaxima,
                'horarios': this.horariosSe
              }*/
              this.estacionamientos.push(res);
              this.horariosSe = [];
            });
        }
      }
      );
  }

 obtenerHorarios(id){
    let url = this.urlHorarios+'/'+id;
    return this.http.get(url);
  }
}
