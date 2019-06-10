import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { CartItem } from '../../../core/cart/cart-item';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

interface AddToCartDialogData {
  cartItem: CartItem;
}

@Component({
  selector: 'pm-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AddToCartDialogComponent implements OnInit {
  cartItem: CartItem;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: AddToCartDialogData,
    private router: Router,
    private matDialogRef: MatDialogRef<AddToCartDialogComponent>
  ) {
    this.cartItem = data.cartItem;
    console.log('showing add to cart dialog for', this.cartItem);
  }
  ngOnInit() {}
  goToCart() {
    this.router.navigate(['cart']).then(() => this.closeDialog());
  }
  continueShopping() {
    this.router.navigate(['products']).then(() => this.closeDialog());
  }
  private closeDialog() {
    this.matDialogRef.close();
  }
}
