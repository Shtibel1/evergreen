import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit, OnDestroy {
  categories: Category[]
  subscription: Subscription

  constructor(
    private categoriesService: CategoryService,
    private http: HttpClient) { }

  ngOnInit(): void {
    
    this.categories = this.categoriesService.getCegories()
    this.subscription = this.categoriesService.categories.subscribe(list => {
      this.categories = list
    })
  }

  onDelete(category: Category) {
    this.categoriesService.deleteCategory(category.name).subscribe()
    this.categoriesService.getCegories()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
