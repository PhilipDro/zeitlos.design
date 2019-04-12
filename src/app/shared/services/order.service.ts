import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase
} from "angularfire2/database";

import { Injectable } from "@angular/core";
import { Order } from "../models/order";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  orders: AngularFireList<Order>;
  orderOfUser: AngularFireList<Order>;
  order: AngularFireObject<Order>;

  constructor(private db: AngularFireDatabase) {
    this.getOrders();
  }

  createOrder(order: Order) {
    this.orders.push(order);
    console.log("order pushed to firebase: " + order);
  }

  getOrders() {
    this.orders = this.db.list("orders");
    return this.orders;
  }

  getordersById(key: string) {
    this.order = this.db.object("orders/" + key);
    return this.orders;
  }

  getOrderOfUser(userId) {
    this.orderOfUser =  this.db.list("orders/", ref => ref.orderByChild("userId").equalTo(userId));
    return this.orderOfUser;
  }
}
