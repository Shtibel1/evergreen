import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { ProductsResolverService } from "../category/products-resolver.service";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { EditComponent } from "./edit.component";
import { ManageCategoriesComponent } from "./manage-categories/manage-categories.component";
import { ManageProductsComponent } from "./manage-products/manage-products.component";


const routes: Routes = [
    { path: '', component:EditComponent, canActivate: [AuthGuard], children: [
        { path: 'manage-products', component:ManageProductsComponent, resolve:[ProductsResolverService]},
        { path: 'add-product', component: AddProductComponent },
        { path: 'add-product/:id', component: AddProductComponent, resolve:[ProductsResolverService] },
        { path: 'add-category', component: AddCategoryComponent },
        { path: 'manage-categories', component: ManageCategoriesComponent },
    ]},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EditRoutingModule {}