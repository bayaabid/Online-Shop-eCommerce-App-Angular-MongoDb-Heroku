import { ProductDataService } from '../product-data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Observable<any>;
  constructor(private productDataService: ProductDataService) {}

  ngOnInit() {
    this.products = this.productDataService.getAllProducts();
  }
}
