import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../data-access/products.service';

@Component({
  selector: 'app-product-list',
  imports: [ ],
  templateUrl: './product-list.html',
  styles: ``,
  providers: [ProductsService], 
})
export default class ProductList {
  private productsService = inject(ProductsService);
  constructor() {
    this.productsService.getProducts().subscribe((products) => {
      console.log(products);
    });
  }
}
