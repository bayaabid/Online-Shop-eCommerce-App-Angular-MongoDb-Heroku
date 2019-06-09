import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/cart/cart.service';
import { Observable, of } from 'rxjs';
import { cartSubTotal, cartItemsCount, shippingCost, estimattedTax, orderTotal } from '@core/cart/cart-selectors';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'pm-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartSummaryComponent implements OnInit {
  cartSubTotal: Observable<number>;
  cartItemsCount: Observable<number>;
  shippingCost: Observable<number>;
  estimattedTax: Observable<number>;
  orderTotal: Observable<number>;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubTotal = cartSubTotal();
    this.cartItemsCount = cartItemsCount();
    this.shippingCost = shippingCost();
    this.estimattedTax = estimattedTax();
    this.orderTotal = orderTotal();
  }
}
