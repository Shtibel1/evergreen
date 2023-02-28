import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ProductsResolverService } from "../resolvers/products-resolver.service";
import { ProductComponent } from "../product/product.component";
import { ProductService } from "../services/product.service";
import { SharedModule } from "../shared.module";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { EditRoutingModule } from "./edit-routing.module";
import { EditComponent } from "./edit.component";
import { ManageCategoriesComponent } from "./manage-categories/manage-categories.component";
import { ManageProductsComponent } from "./manage-products/manage-products.component";

@NgModule({
    declarations: [
        ManageProductsComponent,
        AddProductComponent,
        EditComponent,
        AddCategoryComponent,
        ManageCategoriesComponent,
        
    ],
    imports:[RouterModule, SharedModule, FormsModule, ReactiveFormsModule, HttpClientModule, EditRoutingModule],
    exports: [
    ],
    providers: [ProductsResolverService]
})

export class EditModule {}