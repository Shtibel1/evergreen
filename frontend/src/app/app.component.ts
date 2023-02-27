import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CartService } from './services/cart.service';
import { CategoryService } from './services/category.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'a';
  

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCegories();
    this.authService.autoLogin()
    this.cartService.getCartProducts()
  }

}
