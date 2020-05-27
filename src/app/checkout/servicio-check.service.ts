import { Injectable } from '@angular/core';
import { Order} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class ServicioCheckService {

  order = {} as Order;
  message: string;

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

}

