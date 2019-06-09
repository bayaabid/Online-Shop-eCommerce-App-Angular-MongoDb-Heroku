import { Injectable } from '@angular/core';
import { BehaviorSubject, of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  CartState,
  initialState,
  addCartItem,
  cartSubject,
  updateState,
  updateCartItem
} from './cart-state';
import { LogService } from '@core/utils/logger.service';
import { CartItem } from './cart-item';
import { Product } from '@core/products/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  state: CartState;

  constructor(private logService: LogService) {}

  addToCart(product: Product, quantity: number) {
    const cartItemToAdd = {
      ...product,
      quantity,

      itemTotal: product.price * quantity
    };

    this.logService.log('[Cart] Add', cartItemToAdd);
    this.logService.log('[addToCart] Previous State', this.state);

    this.state = addCartItem(this.state, cartItemToAdd);
    updateState(this.state);

    this.logService.log('[addToCart] Current State', this.state);

    return of(cartItemToAdd);
  }

  updateCartItem(cartItemToUpdate: CartItem) {
    cartItemToUpdate = {
      ...cartItemToUpdate,
      itemTotal: cartItemToUpdate.price * cartItemToUpdate.quantity
    };

    this.logService.log('[Cart] Update', cartItemToUpdate);
    this.logService.log('[addToCart] Previous State', this.state);

    this.state = updateCartItem(this.state, cartItemToUpdate);
    updateState(this.state);

    this.logService.log('[updateCartItem] Current State:', this.state);
  }

  removeCartItem(itemToRemove: CartItem) {
    this.logService.log('[Cart] Remove', itemToRemove);
    this.logService.log('[removeCartItem] Previous State', this.state);

    this.state = updateCartItem(this.state, itemToRemove);
    updateState(this.state);

    this.logService.log('[removeCartItem] Current State', this.state);
  }
}
