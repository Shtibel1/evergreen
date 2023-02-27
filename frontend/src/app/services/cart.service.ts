import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";

@Injectable({providedIn:'root'})
export class CartService {
    products: CartProduct[] = []

    constructor(private http: HttpClient){}

    updateCart() {
        
    }

    addToCart(product: Product, amount: number = 1) {
        if (amount < 1) return
        
        let exist = false;
        this.products.forEach(cartProduct => {
            if (cartProduct.product._id === product._id) {

                if (amount === 1){
                    cartProduct.amount++; 
                    exist = true}
                else{
                    cartProduct.amount = Number(cartProduct.amount) + amount; 
                    exist = true
                }

            }
        })
        
            if (!exist) {
            this.products.push({product, amount})
        }
        // this.http.post('http://localhost:3000/cart', {product, amount}).subscribe()
        localStorage.setItem('products', JSON.stringify(this.products))


    }

    getCartProducts(){
        console.log('Getting products');
        let arr = JSON.parse(localStorage.getItem('products'))
        if (arr)
        this.products = arr

    }

}


export interface CartProduct {
    product: Product;
    amount: number;
}


