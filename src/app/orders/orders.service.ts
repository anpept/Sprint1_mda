import { Injectable } from '@angular/core';
import {Order} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orders: Order[] =[
    {
      id: 1,
      date: new Date(2020, 3, 12, 14, 33, 32),
      products: ['Pizza', 'Papas Fritas', 'Fanta Naranja', 'Ensalada'],
      price: 30.59,
      user: 'Antonio',
      address: 'C/ Test nº 10',
      estado: 'Completado'
    },
    {
      id: 2,
      date: new Date(2020, 4, 2, 12, 38, 37),
      products: ['Pan de ajo', 'Pizza Opera', 'Pizza Casera'],
      price: 24.54,
      user: 'Cliente',
      address: 'C/ Cliente nº 9',
      estado: 'Completado'
    },
    {
      id: 3,
      date: new Date(2020, 4, 8, 11, 15, 13),
      products: ['Ensalada', 'Pizza Opera', 'Batido de Fresa', 'Coca Cola'],
      price: 25.43,
      user: 'Admin',
      address: 'C/ Admin nº 100',
      estado: 'Cancelado'
    },
    {
      id: 4,
      date: new Date(2020, 4, 8, 13, 5, 0),
      products: ['Pizza', 'Pizza Casera', 'Pizza Opera'],
      price: 37.95,
      user: 'Antonio',
      address: 'C/ Test nº 10',
      estado: 'Sin repartir'
    },
    {
      id: 5,
      date: new Date(2020, 4, 8, 13, 5, 0),
      products: ['Pizza', 'Pizza Casera', 'Pizza Opera'],
      price: 37.95,
      user: 'Antonio',
      address: 'C/ Test nº 10',
      estado: 'Cancelado'
    },
    {
      id: 6,
      date: new Date(2020, 4, 10, 15, 10, 7),
      products: ['Pizza', 'Pan de Ajo', 'Pizza Casera', 'Batido de Fresa', 'Papas Fritas'],
      price: 37.08,
      user: 'Cliente',
      address: 'C/ Cliente nº 9',
      estado: 'Pendiente de Pago'
    },
    {
      id: 7,
      date: new Date(2020, 4, 10, 15, 10, 7),
      products: ['Pizza', 'Pan de Ajo', 'Pizza Casera', 'Batido de Fresa', 'Papas Fritas'],
      price: 37.08,
      user: 'Cliente',
      address: 'C/ Cliente nº 9',
      estado: 'Cancelado'
    }
  ];

  constructor() { }

  getOrders() {
    return [...this.orders];
  }

/*  getOrder(orderId: string) {
    return {
      ...this.orders.find(order => {
        return order.id === orderId
      })
    };
  }*/

  deleteOrder() {}
}
