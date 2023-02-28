import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";

@Injectable({providedIn:'root'}) 

export class ProductResolverService implements Resolve<Product> {
    constructor(private productService: ProductService) {}
    bool = false
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
        return this.productService.fetchProduct(route.params.id)
    }
}