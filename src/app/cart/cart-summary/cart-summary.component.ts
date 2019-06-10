import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { CartQueries } from '@core/cart/cart-queries';

@Component({
  selector: 'pm-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartSummaryComponent implements OnInit {
  cartSubTotal: Observable<number>;
  cartItemsCount: Observable<number>;
  shippingCost: Observable<number>;
  estimattedTax: Observable<number>;
  orderTotal: Observable<number>;
  constructor(private cartQueries: CartQueries) {}

  ngOnInit() {
    this.cartSubTotal = this.cartQueries.cartSubTotal;
    this.cartItemsCount = this.cartQueries.cartItemsCount;
    this.shippingCost = this.cartQueries.shippingCost;
    this.estimattedTax = this.cartQueries.estimattedTax;
    this.orderTotal = this.cartQueries.orderTotal;
  }
}
