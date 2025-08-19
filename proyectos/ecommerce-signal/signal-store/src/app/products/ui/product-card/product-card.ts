import { Component, input } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styles: ``
})
export class ProductCard {
  product = input.required<Product>();

}
