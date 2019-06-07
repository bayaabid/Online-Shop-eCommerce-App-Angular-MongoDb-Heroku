import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../cart-item';

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
    this.availableQuantities = this.cartService.availableQuantities;
  }

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.cartItemsCount = this.cartService.cartItemsCount;
  }

  removeCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem);
  }

  updateCartItem(cartItem: CartItem) {
    this.cartService.updateCartItem(cartItem);
  }
}
