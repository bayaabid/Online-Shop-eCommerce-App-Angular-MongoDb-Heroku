import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '@core/cart/cart.service';
import { cartItemsCount } from '@core/cart/cart-selectors';

@Component({
  selector: 'pm-cart-item-count',
  templateUrl: './cart-item-count.component.html',
  styleUrls: ['./cart-item-count.component.scss']
})
export class CartItemCountComponent implements OnInit {
  cartItemCount$: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItemCount$ =  cartItemsCount();
  }
}
