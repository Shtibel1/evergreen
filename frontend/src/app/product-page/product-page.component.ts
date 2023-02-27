import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: Product;
  id: string;
  addedToCart = false;
  msg: string = null
  smallImg = 0

  @ViewChild('amount') amount: ElementRef
  constructor(private route: ActivatedRoute,
    private products: ProductService,
    private cart: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.product = this.products.getProductById(this.id)
    })

    
  }

  onBuyNow() {
    if (this.amount.nativeElement.value <= 0)
    return this.msg = 'Amount must be greater than 0'
    this.cart.addToCart(this.product, Number(this.amount.nativeElement.value))
    this.router.navigate(['/cart']);
  }

  onAddtoCart() {
    if (this.amount.nativeElement.value <= 0)
    return this.msg = 'Amount must be greater than 0'
    this.cart.addToCart(this.product, Number(this.amount.nativeElement.value))
    this.addedToCart = true;
  }

  onSmallImg(i: number) {
    this.smallImg = i
  }

}
