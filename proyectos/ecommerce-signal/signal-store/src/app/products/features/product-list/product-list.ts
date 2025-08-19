import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../../data-access/products-state.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  providers: [ProductsStateService],
})
export default class ProductList {
  productState = inject(ProductsStateService);

}
