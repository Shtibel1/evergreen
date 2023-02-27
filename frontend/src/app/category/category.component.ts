import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @ViewChild('selectedPrice') selectedPrice: number
  @ViewChild('min') min: number
  @ViewChild('max') max: number
  category = '';
  categoryProducts: Product[];
  sortedProducts: Product[] = [];
  sortMode = false;
  constructor(
    private route: ActivatedRoute,
    private products: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.category = params['category-name']
      
      this.products.getProductsByCategory(this.category).subscribe(res => {
        console.log(res);
        this.categoryProducts = res
      })
      this.sortMode = false;
    })
    
  }

  onProduct(product: Product) {
    this. router.navigate(['category', this.category, product._id])
  }

  onBtn() {
    console.log(this.selectedPrice);
    console.log('asd');
  }

  onSortPrice() {
    this.sortedProducts = [];
    this.sortMode = true
    console.log(this.min > this.max);
    if (this.min > this.max) {
      let a = this.min;
      this.min = this.max;
      this.max = a;
    }
    this.categoryProducts.forEach(prod => {
      if (!(prod.price < this.min) && !(prod.price > this.max)){
      this.sortedProducts.push(prod)
      }
    })



    if (!this.min || this.min === 0) {
      this.sortMode = false
    }

    
  }

  onResetSortPrice() {
    this.min = null;
    this.max = null;
    this.sortMode = false
  }

}
