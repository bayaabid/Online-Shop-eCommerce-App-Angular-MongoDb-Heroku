import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/cart/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/cart/cart-item';
import {
  cartItems,
  cartItemsCount,
  availableQuantities
} from '@core/cart/cart-selectors';

@Component({
  selector: 'pm-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Observable<CartItem[]>;
  cartItemsCount: Observable<number>;
  displayedColumns = ['imgUrl', 'name', 'price', 'quantity', 'remove'];
  availableQuantities: number[];
  constructor(private cartService: CartService) {
    this.availableQuantities = availableQuantities();
  }

  ngOnInit() {
    this.cartItems = cartItems();
    this.cartItemsCount = cartItemsCount();
  }

  removeCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem);
  }

  updateCartItem(cartItem: CartItem) {
    this.cartService.updateCartItem(cartItem);
  }
}
