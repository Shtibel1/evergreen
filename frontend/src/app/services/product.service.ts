import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { exhaustMap, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Token } from "@angular/compiler";

@Injectable({providedIn: 'root'})

export class ProductService {
    

    constructor(
        private http: HttpClient,
        private authService: AuthService){}

    public products: Product[] = []
    
    fetchProducts() {
        this.products = []
            return this.http.get<{
                _id: string,
                name: string,
                description: string,
                photoUrl: string[],
                price: number,
                category: string }[]>
                ('http://localhost:3000/products')
        .pipe(tap((res) => {
            res.forEach(serverProduct => {
                let {_id, name, description, photoUrl, price, category} = serverProduct
                this.products.push(new Product(_id, name, description, photoUrl, price, category))
            })
        }))
        
    }
   
    

     

    getProductsByCategory(category: string) {
        return this.http.get<{
            _id: string,
            name: string,
            description: string,
            photoUrl: string[],
            price: number,
            category: string }[]>
            ('http://localhost:3000/products?category='+ category)
    }

    getProductById(id: string) {
        return this.products.find(product => product._id == id );     
    }

    

    
    newProduct(product: Product) {
        if (product._id === '-1')
        return this.http.post<{message: string, _id: string}>('http://localhost:3000/products', product)
        .pipe(
            tap(res => {
                product._id = res._id
                this.products.push(product)
            }))
        return this.http.patch<{message: string}>('http://localhost:3000/products', product)
    }

    deleteProductById(id: string) {
        return this.http.delete<{message: string}>('http://localhost:3000/products', {
            headers: new HttpHeaders({id: String(id)})
        })
        
    }

}


