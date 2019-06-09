import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogService } from '@core/utils/logger.service';
import { delay } from 'rxjs/operators';

@Injectable()
export class ProductDataService {
  constructor(private $http: HttpClient, private logService: LogService) {}

  getAllProducts() {
    this.logService.log('ProductDataService: Fetching Products from server');
    return this.$http.get('products.json').pipe(delay(1000));
  }
}
