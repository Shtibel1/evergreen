import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProductComponent } from "./product/product.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        DropdownDirective,
        ProductComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent,
        DropdownDirective,
        CommonModule,
        ProductComponent
    ]
})

export class SharedModule {}