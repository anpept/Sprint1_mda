import { Injectable } from '@angular/core';


@Injectable()
export class CarroService {

    private products;
    private cantidades;

    constructor() {
        this.products = [{price:5,name:"coca cola"}];
        this.cantidades = [1];
    }

    getProducts(){
        return this.products;
    }
    getCantidades(){
        return this.cantidades;
    }
    setProducts(productos){
        this.products=productos;
    }
    setCantidades(cantidad){
        this.cantidades=cantidad;
    }
}