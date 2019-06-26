import { ProductDataService } from '../../core/products/product-data.service';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@core/products/product';
import { MatSort } from '@angular/material/sort';
import { LogService } from '@core/utils/logger.service';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'pm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>();
  loading = true;
  subscriptions = [];
  displayedColumns = ['imgUrl', 'name', 'price', 'addToCart'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productDataService: ProductDataService,
    private logService: LogService
  ) {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.productDataService.getAllProducts().subscribe(products => {
        this.logService.log('products loaded', products);
        this.onDataLoad(products);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onDataLoad(products: any) {
    this.loading = false;
    this.dataSource.sort = this.sort;
    this.dataSource.data = products;
    this.dataSource.paginator = this.paginator;
  }
}
