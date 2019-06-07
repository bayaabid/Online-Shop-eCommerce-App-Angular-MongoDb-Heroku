import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'pm-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  cartSubTotal: Observable<number>;
  cartItemsCount: Observable<number>;
  shippingCost: Observable<number>;
  estimattedTax: Observable<number>;
  orderTotal: Observable<number>;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubTotal = this.cartService.cartSubTotal;
    this.cartItemsCount = this.cartService.cartItemsCount;
    this.shippingCost = this.cartService.shippingCost;
    this.estimattedTax = this.cartService.estimattedTax;
    this.orderTotal = this.cartService.orderTotal;
  }
}
