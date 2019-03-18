import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";
import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";
import { ToastyService, ToastOptions, ToastyConfig } from "ng2-toasty";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  product: Product;
  imgUrl;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinnerService: LoaderSpinnerService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.product = new Product();
    this.toastyConfig.position = "top-right";
    this.toastyConfig.theme = "material";
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"]; // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
  }

  getProductDetail(id: string) {
    this.spinnerService.show();
    const x = this.productService.getProductById(id);
    x.snapshotChanges().subscribe(
      product => {
        this.spinnerService.hide();
        const y = product.payload.toJSON() as Product;

        y["$key"] = id;
        this.product = y;
        this.product.productImageUrl = "assets/products/product-" + this.product.productId + "-1.jpg";
        this.product.productImageUrl2 = "assets/products/product-" + this.product.productId + "-2.jpg";
        this.product.productImageUrl3 = "assets/products/product-" + this.product.productId + "-3.jpg";
        this.product.productImageUrl4 = "assets/products/product-" + this.product.productId + "-4.jpg";
        this.product.productImageUrl5 = "assets/products/product-" + this.product.productId + "-5.jpg";
        this.product.productImageUrl6 = "assets/products/product-" + this.product.productId + "-6.jpg";
        this.product.productImageUrl7 = "assets/products/product-" + this.product.productId + "-7.jpg";
        this.product.productImageUrl8 = "assets/products/product-" + this.product.productId + "-8.jpg";
      },
      error => {
        const toastOption: ToastOptions = {
          title: "Fehler bei der Abfrage der Detail-Ansicht",
          msg: error,
          showClose: true,
          timeout: 5000,
          theme: "material"
        };
        this.toastyService.error(toastOption);
      }
    );
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  handleBrokenImage() {
    console.log("yeah uhhh");
  }
}
