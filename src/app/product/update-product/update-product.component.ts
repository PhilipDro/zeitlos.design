import {
  ToastyService,
  ToastyConfig,
  ToastOptions,
  ToastData
} from "ng2-toasty";
import { Component, OnInit, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";

declare var $: any;
declare var require: any;
const shortId = require("shortid");
const moment = require("moment");

@Component({
  selector: "app-update-product",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.scss"]
})
export class UpdateProductComponent implements OnInit {
  @Input() key: string;
  @Input() product: Product;

  constructor(
    private productService: ProductService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = "material";
  }

  ngOnInit() {
    console.log(this.product);
  }

  updateProduct(productForm: NgForm) {
    const toastOptions: ToastOptions = {
      title: "",
      msg:
        "Produkt " + productForm.value["productName"] + "wurde erfolgreich hinzugefügt.",
      showClose: true,
      timeout: 5000,
      theme: "default"
    };

    /**
     * Map form values to Product.
     */
    this.product = new Product();
    this.product.productName = productForm.value["productName"];
    this.product.productId = productForm.value["productId"];
    this.product.productCategory = productForm.value["productCategory"];
    this.product.productMaterial = productForm.value["productMaterial"];
    this.product.productSize = productForm.value["productSize"];
    this.product.productStyle = productForm.value["productStyle"];
    this.product.productOrigin = productForm.value["productOrigin"];
    this.product.productManufacturer = productForm.value["productManufacturer"];
    this.product.productDesigner = productForm.value["productDesigner"];
    this.product.productTime = productForm.value["productTime"];
    this.product.productCondition = productForm.value["productCondition"];
    this.product.productDescription = productForm.value["productDescription"];
    this.product.productPrice = productForm.value["productPrice"];
    this.product.productDiscount = productForm.value["productDiscount"];
    this.product.productImageAlt = productForm.value["productImageAlt"];
    this.product.productQuantity = productForm.value["productQuantity"];
    this.product.productSold = productForm.value["productSold"];
    this.product.productActive = productForm.value["productActive"];

    // productForm.value["productId"] = "PROD_" + shortId.generate();
    productForm.value["productAdded"] = moment().unix();

    if (productForm.value["productImageUrl"] === undefined) {
      productForm.value["productImageUrl"] =
        "http://via.placeholder.com/640x360/007bff/ffffff";
    }

    const date = productForm.value["productAdded"];

    this.productService.updateProduct(this.key, this.product);


    this.toastyService.success(toastOptions);
  }
}
