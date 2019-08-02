import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';

import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {

  products: AngularFireList<Product>;

  constructor(private db: AngularFireDatabase) { }

  // getProducts(start, end): FirebaseListObservable<any> {
  //   return this.db.list('products', {
  //     query: {
  //       orderByChild: 'ProductName',
  //       limitToFirst: 10,
  //       startAt: start,
  //       endAt: end
  //     }
  //   });
  // }

  getProducts(start, end) {
    this.products = this.db.list("products", ref => ref.orderByChild("productName").startAt(start).endAt(end).limitToFirst(10));
    return this.products;
  }
}
