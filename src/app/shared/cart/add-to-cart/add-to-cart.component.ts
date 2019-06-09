import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CartService } from '../../../core/cart/cart.service';
import { Product } from '@core/products/product';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { AddToCartDialogComponent } from '../add-to-cart-dialog/add-to-cart-dialog.component';
import {
  availableQuantities,
  isItemAlreadyInCart
} from '@core/cart/cart-selectors';

@Component({
  selector: 'pm-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  availableQuantities: number[];
  quantity: number;

  isItemAlreadyInCart: Observable<boolean>;

  constructor(private cartService: CartService, private matDialog: MatDialog) {}

  ngOnInit() {
    this.availableQuantities = availableQuantities();
    this.quantity = 1;

    this.isItemAlreadyInCart = isItemAlreadyInCart(this.product.id);
  }

  addItemToCart() {
    this.cartService
      .addToCart(this.product, this.quantity)
      .subscribe(cartItem => this.openDialog(cartItem));
  }

  openDialog(cartItem) {
    this.matDialog.open(AddToCartDialogComponent, {
      width: '350px',
      height: '250px',
      data: { cartItem },
      disableClose: true
    });
  }

  ngOnDestroy(): void {}
}
