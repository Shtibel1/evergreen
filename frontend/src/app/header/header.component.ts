import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  siteCategories: Category[];
  subscription: Subscription
  categoryHighlighted: string
  private userSub: Subscription
  isAuth = false;
  constructor(private categoryService: CategoryService, 
    private authService: AuthService
    ,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.categoryService.getCegories();
    this.subscription = this.categoryService.categories.subscribe(list => {
      this.siteCategories = list
      this.cdr.detectChanges()
    })

    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuth = !!user
    })
  }
  
  onLogout() {
    this.authService.logout()
  }
  
  onCategoryHighlight(categoryName: string) {
    this.categoryHighlighted = categoryName
  }
  
  onCategoryHighlightLeave() {
    this.categoryHighlighted = null
  }

  onDet() {
    // console.log('header det');
  }
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
