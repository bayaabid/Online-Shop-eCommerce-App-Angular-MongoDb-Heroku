import { ProductDataService } from '../product-data.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@core/models/product';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Product>;
  subscriptions = [];
  displayedColumns = ['imgUrl', 'name', 'price', 'addToCart'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productDataService: ProductDataService) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.productDataService.getAllProducts().subscribe((products: any) => {
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.sort = this.sort;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
