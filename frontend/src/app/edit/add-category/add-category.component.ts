import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  @ViewChild('f') addCategoryForm: NgForm
  categories: Category[]
  msg: string = null

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCegories();
    console.log(this.categories);
  }

  onSubmit() {
    this.categoryService.saveCategory(this.addCategoryForm.value.name, this.addCategoryForm.value.father)
    .subscribe(res => {
      this.msg = res.message
    }, err => {
      this.msg = err.message
    })
    this.categoryService.getCegories();
    this.addCategoryForm.reset()
  }
}
