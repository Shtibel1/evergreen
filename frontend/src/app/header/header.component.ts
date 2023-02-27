import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  siteCategories: Category[];
  subscription: Subscription
  categoryHighlighted: string
  private userSub: Subscription
  isAuth = false;
  constructor(private categoryService: CategoryService, private authService: AuthService) { }

  ngOnInit(): void {
    
    this.siteCategories = this.categoryService.getCegories()
    this.subscription = this.categoryService.categories.subscribe(list => {
      this.siteCategories = list
      console.log(this.siteCategories);
    })

    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuth = !!user
    })
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    
  }

  onCategoryHighlight(categoryName: string) {
    this.categoryHighlighted = categoryName
  }

  onCategoryHighlightLeave() {
    this.categoryHighlighted = null
  }
}
