import { Component, OnInit } from '@angular/core';
import { SearchProductsService } from '../../shared/services/search-products.service';
import { Subject } from 'rxjs/Subject'

import { Product } from "../../shared/models/product";

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {
  // TODO implement asynchronous observable based approach

  startAt = "";
  endAt = "";
  productList: Product[];

  constructor(private searchProductsService: SearchProductsService) { }

  ngOnInit() {
    this.runSearch();
  }

  search($event) {
    let q = $event.target.value;
    this.startAt = q;
    this.endAt = q + "\uf8ff";

    this.runSearch();
  }

  runSearch() {
    const products = this.searchProductsService.getProducts(this.startAt, this.endAt);
    products.snapshotChanges().subscribe(
      product => {
        this.productList = [];
        product.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          this.productList.push(y as Product);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

}
