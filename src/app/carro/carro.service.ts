import { Injectable } from '@angular/core';
import { Observable, of, merge, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import {ToastController} from "@ionic/angular";

@Injectable()
export class CarroService {

    private products;
    private cantidades;
    direccion: string;
    constructor(private toastCtrl: ToastController) {
        this.products = [{price:15,name:"Pizza Opera"},{price:2,name:"Coca Cola"}];
        this.cantidades = [1,1];
    }

    getProducts():Observable<Array<any>>{
        return this.products;
    }
    addProduct(i):Observable<Array<any>>{
        this.products.push(i);
        this.cantidades.push(1);
        return this.products;
    }
    getCantidades():Observable<Array<any>>{
        return this.cantidades;
    }
    setProducts(productos){
        this.products=productos;
    }
    setCantidades(cantidad){
        this.cantidades=cantidad;
    }
    getArrayProducts(){
        return this.products;
    }
    getPrecio(){
        var total=0;
        for(let indice=0; indice<this.products.length; indice++){
            total += this.cantidades[indice]*this.products[indice].price;
        }
        return total;
    }

}
