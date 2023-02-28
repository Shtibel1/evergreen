import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, exhaustMap, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Token } from "@angular/compiler";

@Injectable({providedIn: 'root'})

export class ProductService {
    
    public products: Product[] = []
    // public products = new BehaviorSubject<products[]>

    constructor(
        private http: HttpClient,
        private authService: AuthService){}

    
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
   
    fetchProduct(id: string) {
        return this.http.get<Product>('http://localhost:3000/products?id=' + id).pipe(
            tap(res => {
                this.products.push(res)
            })
        )
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
        console.log(id);
        console.log(this.products);
        let selectedProduct = this.products.find(product => product._id == id );    
        console.log(selectedProduct); 
        if (selectedProduct) return selectedProduct
        
        this.fetchProduct(id).subscribe(res => {
            console.log(res);
            return res
        })
        
        
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


