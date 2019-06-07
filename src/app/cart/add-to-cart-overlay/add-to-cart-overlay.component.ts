import { Component, OnInit, Inject } from '@angular/core';
import { CartItem } from '../cart-item';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

interface AddToCartOverlayData {
  cartItem: CartItem;
}

@Component({
  selector: 'pm-add-to-cart-overlay',
  templateUrl: './add-to-cart-overlay.component.html',
  styleUrls: ['./add-to-cart-overlay.component.scss']
})
export class AddToCartOverlayComponent implements OnInit {
  cartItem: CartItem;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: AddToCartOverlayData,
    private router: Router,
    private matDialogRef: MatDialogRef<AddToCartOverlayComponent>
  ) {
    this.cartItem = data.cartItem;
    console.log('showing add to cart overlay for', this.cartItem);
  }
  ngOnInit() {}
  goToCart() {
    this.router.navigate(['cart']).then(s => this.closeDialog());
  }
  continueShopping() {
    this.router.navigate(['products']).then(s => this.closeDialog());
  }
  private closeDialog() {
    this.matDialogRef.close();
  }
}
