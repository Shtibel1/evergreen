import { NgModule } from "@angular/core";
import { PreloadAllModules, Routes } from '@angular/router';
import { RouterModule } from '@angular/router'

import { AuthComponent } from "./auth/auth.component";
import { CartComponent } from "./cart/cart.component";
import { CategoryComponent } from "./category/category.component";
import { ProductsResolverService } from "./category/products-resolver.service";
import { EditModule } from "./edit/edit.module";

import { ProductPageComponent } from "./product-page/product-page.component";

const appRoutes: Routes = [
  { path:'', redirectTo:'category/sheds' , pathMatch:'full'},
  { path:'edit', loadChildren: () => import('./edit/edit.module').then((mod) => mod.EditModule),},
  { path:'cart', component:CartComponent},
  { path: 'auth', component:AuthComponent},
  
  
  { path:'category/:category-name', component:CategoryComponent, resolve:[ProductsResolverService]},
  { path: 'category/:category-name/:id', component:ProductPageComponent, resolve:[ProductsResolverService]},
  
  
]


@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})

export class AppRoutingModule {

}