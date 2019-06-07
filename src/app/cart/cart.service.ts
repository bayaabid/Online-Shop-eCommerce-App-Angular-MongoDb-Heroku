import { Injectable } from '@angular/core';
import { BehaviorSubject, of, combineLatest } from 'rxjs';

import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { CartState, initialState } from './state/cart-state';
import { Product } from '@core/models/product';
import { LogService } from '@core/logger.service';
import { CartItem } from './cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartSubject = new BehaviorSubject<CartState>(initialState);

  constructor(private logService: LogService) {}

  get cartItems() {
    return this.cartState.pipe(map(s => s.cartItems));
  }

  get availableQuantities() {
    return Array.from({ length: 30 }, (v, i) => i);
  }

  get cartState() {
    return this.cartSubject.asObservable();
  }

  get cartItemsCount() {
    return this.cartSubject.pipe(map(state => state.cartItems.length));
  }

  get shippingCost() {
    return this.cartItemsCount.pipe(map(count => (count ? 10 : 0)));
  }

  get estimattedTax() {
    return this.cartItemsCount.pipe(map(count => (count ? 5 : 0)));
  }

  isItemAlreadyInCart(itemId) {
    return this.cartSubject.pipe(
      map(
        state => state.cartItems.filter(item => item.id === itemId).length > 0
      )
    );
  }

  get orderTotal() {
    return combineLatest(
      this.cartSubTotal,
      this.shippingCost,
      this.estimattedTax,
      (cartSubTotal, shippingCost, estimattedTax) =>
        cartSubTotal + shippingCost + estimattedTax
    );
  }

  get cartSubTotal() {
    return this.cartSubject.pipe(
      switchMap(state => {
        const subTotal = state.cartItems.reduce((subTotal, item) => {
          subTotal += item.itemTotal;
          return subTotal;
        }, 0);
        return of(subTotal);
      })
    );
  }

  addToCart(product: Product, quantity: number) {
    this.logService.log('[addToCart] Previous State', this.currentState);
    const itemTotal = product.price * quantity;
    const cartItemToAdd = { ...product, quantity, itemTotal };
    const newState = {
      ...this.currentState,
      cartItems: [].concat(this.currentState.cartItems, cartItemToAdd)
    };

    this.cartSubject.next(newState);

    this.logService.log('[addToCart] Current State', this.currentState);

    return of(cartItemToAdd);
  }

  updateCartItem(cartItemToUpdate: CartItem) {
    this.logService.log('Item To update', cartItemToUpdate);
    cartItemToUpdate.itemTotal =
      cartItemToUpdate.price * cartItemToUpdate.quantity;
    this.logService.log('[updateCartItem] Previous State:', this.currentState);

    const newCartItems = this.currentState.cartItems.map(i =>
      i.id === cartItemToUpdate.id ? cartItemToUpdate : i
    );

    const newState = {
      ...this.currentState,
      cartItems: newCartItems
    };

    this.cartSubject.next(newState);

    this.logService.log('[updateCartItem] Current State:', this.currentState);
  }

  removeCartItem(itemToRemove) {
    this.logService.log('Item To Remove', itemToRemove);
    this.logService.log('[removeCartItem] Previous State', this.currentState);

    const newCartItems = this.currentState.cartItems.filter(
      i => i.id !== itemToRemove.id
    );

    const newState = {
      ...this.currentState,
      cartItems: newCartItems
    };

    this.cartSubject.next(newState);

    this.logService.log('[removeCartItem] Current State', this.currentState);
  }

  get currentState() {
    return this.cartSubject.value;
  }
}
