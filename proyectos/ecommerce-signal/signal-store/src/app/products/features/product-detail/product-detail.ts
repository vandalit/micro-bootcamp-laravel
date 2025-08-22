import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styles: ``
})
export default class ProductDetail {
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params.subscribe(params => {
      //const productId = params['id'];
      // Logic to fetch and display product details using productId
      console.log(params);
    });
  }
}
