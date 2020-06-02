import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class CarroService {

    private products=[];
    private cantidades=[];

    getProducts(){
        return this.products;
    }
    addProduct(i){
        if(this.products.includes(i)){
            this.cantidades[this.products.indexOf(i)]+=1;
            return this.products.indexOf(i);
        }else{
            this.products.push(i);
            this.cantidades.push(1);
            return this.products.indexOf(i);
        }
        
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