import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductService } from './services/product.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { CategoryService } from './services/category.service';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartComponent } from './cart/cart.component';
import { CartProductComponent } from './cart/cart-product/cart-product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ProductsResolverService } from './category/products-resolver.service';

import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { EditModule } from './edit/edit.module';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AppComponent,
    CategoryComponent,
    ProductPageComponent,
    CartComponent,
    CartProductComponent, 
    AuthComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule, 
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    ProductService, 
    CategoryService, 
    ProductsResolverService, 
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
