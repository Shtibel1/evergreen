import { ChangeDetectionStrategy, Component, Input, OnInit, ɵChangeDetectorStatus } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartProduct } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent implements OnInit {
  @Input('product') product: CartProduct
  constructor() { }

  ngOnInit(): void {
  }

}
