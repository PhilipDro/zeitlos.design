import { ProductService } from "./../../../shared/services/product.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../../../shared/models/product";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  checkoutProducts: Product[];
  agbcheck = false;
  totalPrice = 0;

  constructor(
    productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    document.getElementById("shippingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("resultTab").style.display = "none";

    const products = productService.getLocalCartProducts();

    this.checkoutProducts = products;

    products.forEach(product => {
      this.totalPrice += product.productPrice;
    });
  }

  ngOnInit() {
  }

  validateInput(form: NgForm) {
    if (this.agbcheck) {
      this.router.navigate([
        "checkouts",
        {outlets: {checkOutlet: ["shipping-details"]}}
      ]);
    }
    else {
      this.toastr.error("Bitte akzeptieren Sie die AGB.");
    }
  }
}
