import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('f') addCategoryForm: NgForm
  categories: Category[]
  msg: string = null
  subscription: Subscription

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.subscription =this.categoryService.categories.subscribe(res => {
      this.categories = res
    })

  }

  onSubmit() {
    this.categoryService.saveCategory(this.addCategoryForm.value.name, this.addCategoryForm.value.father)
    .subscribe(res => {
      this.msg = res.message
    }, err => {
      this.msg = err.message
    })
    this.addCategoryForm.reset()
  }

  onDet() {
    console.log('det add-category');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
