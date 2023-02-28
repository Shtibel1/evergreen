import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Subject, tap } from "rxjs";
import { Category } from "../models/category.model";

@Injectable({providedIn: 'root'})


export class CategoryService {

    constructor(private http: HttpClient){}

    categories = new BehaviorSubject<Category[]>(null)

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
            this.categories.next(res)
        })
        
        
        return categoriesArr
    }

    saveCategory(name: string, father: string) {
        return this.http.post<{message: string, categories: Category[]}>('http://localhost:3000/categories', {name, father})
        .pipe(
            tap((res) => {
                this.categories.next(res.categories)
            })
        )
    }

    deleteCategory(name: string) {
        return this.http.delete('http://localhost:3000/categories?name=' + name, {
            // params: new HttpParams().set('name', name), why its not working?
        }).pipe(
            tap(() => {
                let arr = this.categories.getValue().filter(value => value.name != name)
                this.categories.next(arr)
            })
        )
    }


}

