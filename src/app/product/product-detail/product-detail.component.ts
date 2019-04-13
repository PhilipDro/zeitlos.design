import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";

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
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params["id"]; // (+) converts string 'id' to a number
      this.getProductDetail(id);
    });
  }

  getProductDetail(id: string) {
    const selectedProduct = this.productService.getProductById(id);
    selectedProduct.snapshotChanges().subscribe(
      product => {
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
      err => {
        console.log("Fehler bei der Abfrage der Detail-Ansicht" + err);
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
