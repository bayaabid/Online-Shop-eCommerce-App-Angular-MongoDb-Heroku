declare let paypal: any;
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-paypal-checkout',
  templateUrl: './paypal-checkout.component.html',
  styleUrls: ['./paypal-checkout.component.scss']
})
export class PaypalCheckoutComponent implements OnInit {
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.orderTotal.subscribe(total => (this.finalAmount = total));
  }
  addScript: boolean = false;
  paypalLoad: boolean = true;

  finalAmount: number = 1;

  paypalConfig = {
    style: {
      size: 'responsive'
    },
    env: 'sandbox',
    client: {
      sandbox:
        'AULe_9leoINkKVQgviERbCi-BzO3oqkKslbUz_2-m0bUrrKWwwy79RJS1FCu58wRMM2Ku7v6o5o1fPLd'
      // production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then(payment => {
        console.log('The payment was succeeded', payment);
        this.router.navigate(['products']);
      });
    },
    onCancel: data => {
      console.log('The payment was cancelled', data);
    },
    onError: data => {
      console.log('Payment Error', data);
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-button-container');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
}
