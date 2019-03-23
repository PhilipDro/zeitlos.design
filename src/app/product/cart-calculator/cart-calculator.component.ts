import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
import { Product } from "../../shared/models/product";

@Component({
  selector: "app-cart-calculator",
  templateUrl: "./cart-calculator.component.html",
  styleUrls: ["./cart-calculator.component.scss"]
})
export class CartCalculatorComponent implements OnInit, OnChanges {
  @Input() products: Product[];

  totalValue = 0;
  mwst = 0;
  tax = 0.16;
  shippingCost: number;
  standardShippingCost = 150;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    const dataChanges: SimpleChange = changes.products;

    const products: Product[] = dataChanges.currentValue;
    this.totalValue = 0;
    this.mwst = 0;

    this.shippingCost = this.products.length > 1 ? this.standardShippingCost : this.products[0].productShippingCost;
    this.totalValue = this.shippingCost;

    products.forEach(product => {
      this.totalValue += product.productPrice;
    });
    this.mwst = this.totalValue * this.tax;
  }

}
