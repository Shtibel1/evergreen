import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject, tap } from "rxjs";
import { Category } from "../models/category.model";

@Injectable({providedIn: 'root'})


export class CategoryService {

    constructor(private http: HttpClient){}

     

    categories = new Subject<Category[]>()

    getCegories() {
        let categoriesArr: Category[] = []
        this.http
        .get<Category[]>('http://localhost:3000/categories')
        .pipe(
            map(res => {
            res.forEach((category) => {
                categoriesArr.push(category)
            })
            return categoriesArr
        })).subscribe((res) => {
            this.categories.next(categoriesArr)
        })
        
        
        return categoriesArr
    }

    saveCategory(name: string, father: string) {
        return this.http.post<{message: string}>('http://localhost:3000/categories', {name, father})
    }

    deleteCategory(name: string) {
        return this.http.delete('http://localhost:3000/categories', {body: 'asd'})
    }
}