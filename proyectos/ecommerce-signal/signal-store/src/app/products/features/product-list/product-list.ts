import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../../data-access/products-state.service';
import { ProductCard } from '../../ui/product-card/product-card';
@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  providers: [ProductsStateService],
})
export default class ProductList {
  productState = inject(ProductsStateService);

  changePage() {
    const page = this.productState.state.page() + 1;
    this.productState.changePage$.next(page);
  }

}
