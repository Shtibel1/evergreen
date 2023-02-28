import { ChangeDetectionStrategy, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  hovered;
  btnHovered;
  @Input('product') product: Product;
  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  onBuyNow() {
    this.cartService.addToCart(this.product)
    this.router.navigate(['/cart']);
  }
  


  onDetect() {
    // console.log('1');
  }


}
