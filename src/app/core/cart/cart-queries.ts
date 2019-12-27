import { map, distinctUntilChanged } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartStore } from './cart-store';

const TAX = 0.02;
const SHIPPING = 0.01;
export const ALLOWED_QUANTITIES = Array.from({ length: 30 }, (v, i) => i);

@Injectable({ providedIn: 'root' })
export class CartQueries {
  constructor(private cartStore: CartStore) {}

  get cartState() {
    return this.cartStore.state$;
  }

  get cartItems() {
    return this.cartState.pipe(
      distinctUntilChanged(),
      map(s => s.cartItems)
    );
  }

  get cartItemsCount() {
    return this.cartItems.pipe(
      map(items =>
        items.reduce(
          (totalCount, currentItem) => totalCount + currentItem.quantity,
          0
        )
      )
    );
  }
  isItemAlreadyInCart(itemId: number) {
    return this.cartItems.pipe(
      map(items => items.filter(item => item.id === itemId).length > 0)
    );
  }
  get cartSubTotal() {
    return this.cartItems.pipe(
      map(items =>
        items.reduce(
          (subTotal, currentItem) => subTotal + currentItem.itemTotal,
          0
        )
      )
    );
  }

  get shippingCost() {
    return this.cartSubTotal.pipe(
      distinctUntilChanged(),
      map(subTotal => subTotal * SHIPPING)
    );
  }

  get estimattedTax() {
    return this.cartSubTotal.pipe(
      distinctUntilChanged(),
      map(subTotal => subTotal * TAX)
    );
  }

  get orderTotal() {
    return combineLatest(
      this.cartSubTotal,
      this.shippingCost,
      this.estimattedTax,
      (cartSubTotal: number, shippingCost: number, estimattedTax: number) =>
        cartSubTotal + shippingCost + estimattedTax
    );
  }
}
