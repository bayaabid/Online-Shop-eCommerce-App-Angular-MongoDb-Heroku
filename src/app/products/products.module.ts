import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductDataService } from './product-data.service';
import { PmMaterialModule } from '../material-module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule, HttpClientModule, PmMaterialModule],
  providers: [ProductDataService]
})
export class ProductsModule {}
