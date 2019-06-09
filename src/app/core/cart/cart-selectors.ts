import { cartSubject } from './cart-state';
import { map, switchMap } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
const TAX = 0.02;
const SHIPPING = 0.01;
export const cartState = () => cartSubject.asObservable();

export const cartItems = () => cartState().pipe(map(s => s.cartItems));

export const availableQuantities = () =>
  Array.from({ length: 30 }, (v, i) => i);

export const cartItemsCount = () =>
  cartState().pipe(map(state => state.cartItems.length));

export const shippingCost = () =>
  cartSubTotal().pipe(map(subTotal => subTotal * SHIPPING));

export const estimattedTax = () =>
  cartSubTotal().pipe(map(subTotal => subTotal * TAX));

export const isItemAlreadyInCart = (itemId: number) =>
  cartState().pipe(
    map(state => state.cartItems.filter(item => item.id === itemId).length > 0)
  );

export const cartSubTotal = () =>
  cartState().pipe(
    switchMap(state => {
      const subTotal = state.cartItems.reduce((subTotal, item) => {
        subTotal += item.itemTotal;
        return subTotal;
      }, 0);
      return of(subTotal);
    })
  );

export const orderTotal = () =>
  combineLatest(
    cartSubTotal(),
    shippingCost(),
    estimattedTax(),
    (cartSubTotal: number, shippingCost: number, estimattedTax: number) =>
      cartSubTotal + shippingCost + estimattedTax
  );
