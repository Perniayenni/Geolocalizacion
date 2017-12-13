import { Horarios } from './horarios';

export class Estacionamiento {
  id_es?:number;
  nombreEs: string;
  direccion: string;
  lt: any;
  lng: any;
  capacidad?: number;
  tipoEs?: string;
  alturaMaxima?: number;
  disponibles?: number;
  duracion?:string;
  valorDurac?:number;
  empresa:any;
  horarios: Horarios[];

  constructor(id_es:number, nombreEs: string, direccion: string, lt: any, lng: any, capacidad: number, tipoEs: string,
              alturaMaxima: number, disponibles: number, empresa:any) {
    this.id_es = id_es;
    this.nombreEs = nombreEs;
    this.direccion = direccion;
    this.lt = lt;
    this.lng = lng;
    this.capacidad = capacidad;
    this.tipoEs = tipoEs;
    this.alturaMaxima = alturaMaxima;
    this.disponibles = disponibles;
    this.empresa = empresa;
  }
}
