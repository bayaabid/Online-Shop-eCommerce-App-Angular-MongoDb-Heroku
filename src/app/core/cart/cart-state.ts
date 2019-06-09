import { CartItem } from './cart-item';
import { BehaviorSubject } from 'rxjs';

export interface CartState {
  cartItems: CartItem[];
}

export const initialState = {
  cartItems: []
};

export const cartSubject = new BehaviorSubject<CartState>(initialState);

export const updateState = state => cartSubject.next(state);

export const addCartItem = (state: CartState, cartItemToAdd: CartItem) => {
  return {
    ...state,
    cartItems: [].concat(state.cartItems, cartItemToAdd)
  };
};

export const updateCartItem = (
  state: CartState,
  cartItemToUpdate: CartItem
) => {
  const newCartItems = state.cartItems.map(i =>
    i.id === cartItemToUpdate.id ? cartItemToUpdate : i
  );

  return {
    ...state,
    cartItems: newCartItems
  };
};

export const removeCartItem = (
  state: CartState,
  cartItemToUpdate: CartItem
) => {
  const newCartItems = state.cartItems.filter(
    i => i.id !== cartItemToUpdate.id
  );

  return {
    ...state,
    cartItems: newCartItems
  };
};
