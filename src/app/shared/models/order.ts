import * as moment from "moment";
import _date = moment.unitOfTime._date;
import {Product} from "./product";

export class Order {
  $key: string;
  orderId: number;
  userId: string;
  orderDate: _date;
  shippingId: string;
  billingId: string;
  products: Product[];
}
