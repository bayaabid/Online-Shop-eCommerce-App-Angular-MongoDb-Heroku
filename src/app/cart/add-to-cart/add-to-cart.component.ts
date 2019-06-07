import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '@core/models/product';
import { MatDialog } from '@angular/material';
import { AddToCartOverlayComponent } from '../add-to-cart-overlay/add-to-cart-overlay.component';
import { Observable } from 'rxjs';

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
    this.availableQuantities = this.cartService.availableQuantities;
    this.quantity = 1;

    this.isItemAlreadyInCart = this.cartService.isItemAlreadyInCart(
      this.product.id
    );
  }

  addItemToCart() {
    this.cartService
      .addToCart(this.product, this.quantity)
      .subscribe(cartItem => this.openDialog(cartItem));
  }

  openDialog(cartItem) {
    this.matDialog.open(AddToCartOverlayComponent, {
      width: '350px',
      height: '250px',
      data: { cartItem },
      disableClose: true
    });
  }

  ngOnDestroy(): void {}
}
