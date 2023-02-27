import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  products: Product[] = []
  searchValue: string

  constructor(
    private productService: ProductService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.products = this.productService.products
    console.log(this.products);
    this.searchValue
    
  }


  onSearch() {
  
  }

  onProduct(product: Product) {
    this. router.navigate(['edit/add-product', product._id])
  }
}
