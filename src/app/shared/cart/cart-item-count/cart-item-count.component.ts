import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { CartQueries } from '@core/cart/cart-queries';

@Component({
  selector: 'pm-cart-item-count',
  templateUrl: './cart-item-count.component.html',
  styleUrls: ['./cart-item-count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemCountComponent implements OnInit {
  cartItemCount$: Observable<number>;

  constructor(private cartQueries: CartQueries) {}

  ngOnInit() {
    this.cartItemCount$ = this.cartQueries.cartItemsCount;
  }
}
