import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { CartProduct, CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[];
  total = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartProducts = this.cartService.products
      this.cartProducts.forEach(cartProduct => {
        this.total += cartProduct.product.price * cartProduct.amount
      })

     
  }

  onDetect() {
    console.log('cart detect');
  }

}
