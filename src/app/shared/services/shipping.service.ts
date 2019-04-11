import {
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase
} from "angularfire2/database";
import { UserDetail } from "../models/user";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ShippingService {
  shippings: AngularFireList<UserDetail>;
  shippingsOfUser: AngularFireList<UserDetail>;
  shipping: AngularFireObject<UserDetail>;

  constructor(private db: AngularFireDatabase) {
    this.getshippings();
  }

  createshippings(data: UserDetail) {
    this.shippings.remove();
    this.shippings.push(data);
  }

  getshippings() {
    this.shippings = this.db.list("shippings");
    return this.shippings;
  }

  getshippingById(key: string) {
    this.shipping = this.db.object("shippings/" + key);
    return this.shipping;
  }

  // getShippingOfUser(userId) {
  //   this.shippingsOfUser =  this.db.list("shippings", ref => ref.orderByChild("userId").equalTo(userId));
  //   return this.shippingsOfUser;
  // }

  getShippingOfUser(userId) {
    this.shippingsOfUser =  this.db.list("shippings", ref => ref.orderByChild("userId").equalTo(userId));
    return this.shippingsOfUser;
  }

  updateshipping(data: UserDetail) {
    this.shippings.update(data.$key, data);
  }

  deleteshipping(key: string) {
    this.shippings.remove(key);
  }
}
