import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { LogService } from '@core/utils/logger.service';
import { CartItem } from './cart-item';
import { Product } from '@core/products/product';
import { CartStore } from './cart-store';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private logService: LogService, private cartStore: CartStore) {}

  addToCart(product: Product, quantity: number) {
    const cartItemToAdd = {
      ...product,
      quantity,

      itemTotal: product.price * quantity
    };

    this.cartStore.addCartItem(cartItemToAdd);

    return of(cartItemToAdd);
  }

  updateCartItem(cartItemToUpdate: CartItem) {
    cartItemToUpdate = {
      ...cartItemToUpdate,
      itemTotal: cartItemToUpdate.price * cartItemToUpdate.quantity
    };

    this.cartStore.updateCartItem(cartItemToUpdate);

    return of(cartItemToUpdate);
  }

  removeCartItem(itemToRemove: CartItem) {
    this.cartStore.removeCartItem(itemToRemove);

    return of(itemToRemove);
  }

  clearCart() {
    this.cartStore.clearCart();
  }
}
