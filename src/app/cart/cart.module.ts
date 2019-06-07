import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';

import { CartItemCountComponent } from './cart-item-count/cart-item-count.component';
import { SharedModule } from '../shared/shared.module';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AddToCartOverlayComponent } from './add-to-cart-overlay/add-to-cart-overlay.component';

import { CartSummaryComponent } from './cart-summary/cart-summary.component';

import { PaypalCheckoutComponent } from './paypal-checkout/paypal-checkout.component';

@NgModule({
  declarations: [
    CartItemCountComponent,
    AddToCartComponent,
    ShoppingCartComponent,
    AddToCartOverlayComponent,
    CartSummaryComponent,
    PaypalCheckoutComponent
  ],
  imports: [CommonModule, CartRoutingModule, SharedModule],
  exports: [CartItemCountComponent, AddToCartComponent],
  entryComponents: [AddToCartOverlayComponent]
})
export class CartModule {}
