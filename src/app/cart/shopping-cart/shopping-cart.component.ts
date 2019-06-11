import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from '../../core/cart/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../core/cart/cart-item';
import { ALLOWED_QUANTITIES, CartQueries } from '@core/cart/cart-queries';

@Component({
  selector: 'pm-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Observable<CartItem[]>;

  cartItemsCount: Observable<number>;
  displayedColumns = ['imgUrl', 'name', 'price', 'quantity', 'remove'];
  availableQuantities: number[];

  constructor(
    private cartService: CartService,
    private cartQueries: CartQueries
  ) {
    this.availableQuantities = ALLOWED_QUANTITIES;
  }

  ngOnInit() {
    this.cartItems = this.cartQueries.cartItems;
    this.cartItemsCount = this.cartQueries.cartItemsCount;
  }

  removeCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem);
  }

  updateCartItem(event: { value: number }, cartItem: CartItem) {
    this.cartService.updateCartItem({ ...cartItem, quantity: event.value });
  }
}
