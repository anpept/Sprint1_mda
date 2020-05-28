import { Injectable } from '@angular/core';
import { Order} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class ServicioCheckService {

  order = {} as Order;
  message: string;
  clientId: string;
  direccion: string;

  constructor() { }

  setOrder(pedido: Order){
    this.order = pedido;
  }
  getOrder(){
    return this.order;
  }
  setMessage(mensaje: string){
    this.message = mensaje;
  }
  getMessage(){
    return this.message;
  }
  setClientId(id){
    this.clientId = id;
  }
  getClientId(){
    return this.clientId;
  }
  setDireccion(dir){
    this.direccion = dir;
  }
  getDireccion(){
    return this.direccion;
  }

}

