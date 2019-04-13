import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";

declare var $: any;
declare var require: any;
const shortId = require("shortid");
const moment = require("moment");

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  product: Product = new Product();
  constructor(
    private productService: ProductService,
  ) {
  }

  ngOnInit() {}

  createProduct(productForm: NgForm) {
    console.log("Produkt " + productForm.value["productName"] + " wurde erfolgreich hinzugefügt.");
    // productForm.value["productId"] = "PROD_" + shortId.generate();
    productForm.value["productAdded"] = moment().unix();
    productForm.value["ratings"] = Math.floor(Math.random() * 5 + 1);
    if (productForm.value["productImageUrl"] === undefined) {
      productForm.value["productImageUrl"] =
        "http://via.placeholder.com/640x360/007bff/ffffff";
    }

    /**
     * Map form values to newly generated Product.
     */
    this.product = new Product();
    this.product.productName = productForm.value["productName"] || "";
    this.product.productId = productForm.value["productId"] || "";
    this.product.productCategory = productForm.value["productCategory"] || "";
    this.product.productMaterial = productForm.value["productMaterial"] || "";
    this.product.productSize = productForm.value["productSize"] || "";
    this.product.productStyle = productForm.value["productStyle"] || "";
    this.product.productOrigin = productForm.value["productOrigin"] || "";
    this.product.productManufacturer = productForm.value["productManufacturer"] || "";
    this.product.productDesigner = productForm.value["productDesigner"] || "";
    this.product.productTime = productForm.value["productTime"] || "";
    this.product.productCondition = productForm.value["productCondition"] || "";
    this.product.productDescription = productForm.value["productDescription"] || "";
    this.product.productPrice = productForm.value["productPrice"] || "";
    this.product.productDiscount = productForm.value["productDiscount"] || 0;
    this.product.productImageUrl = "assets/products/product-" + this.product.productId + "-1.jpg";
    this.product.productImageUrl2 = "assets/products/product-" + this.product.productId + "-2.jpg";
    this.product.productImageUrl3 = "assets/products/product-" + this.product.productId + "-3.jpg";
    this.product.productImageUrl4 = "assets/products/product-" + this.product.productId + "-4.jpg";
    this.product.productImageUrl5 = "assets/products/product-" + this.product.productId + "-5.jpg";
    this.product.productImageUrl6 = "assets/products/product-" + this.product.productId + "-6.jpg";
    this.product.productImageUrl7 = "assets/products/product-" + this.product.productId + "-7.jpg";
    this.product.productImageUrl8 = "assets/products/product-" + this.product.productId + "-8.jpg";
    this.product.productImageAlt = productForm.value["productImageAlt"] || "";
    this.product.productShippingCost = productForm.value["productShippingCost"] || 150;
    this.product.productAvailable = productForm.value["productAvailable"] || true;
    this.product.productQuantity = productForm.value["productQuantity"] || 1;
    this.product.productSold = productForm.value["productSold"] || false;
    this.product.productActive = productForm.value["productActive"] || true;

    const date = productForm.value["productAdded"];

    this.productService.createProduct(this.product);

    // this.product = new Product();
  }
}
