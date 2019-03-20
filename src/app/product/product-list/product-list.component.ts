import { Component, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product";
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";
import { ToastyService, ToastOptions, ToastyConfig } from "ng2-toasty";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
  private sub: any;

  path;
  productList: Product[];
  showAddProducts = false;
  showUpdateProducts = false;
  productToUpdate: Product;
  keyToUpdate: string;
  test;

  brands = [
    "Tische",
    "Stühle",
    "Schränke"
  ];

  selectedBrand: "All";

  page = 1;
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinnerService: LoaderSpinnerService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.position = "top-right";
    this.toastyConfig.theme = "material";
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const category = params["productCategory"]; // (+) converts string 'id' to a number

      this.path = !category ? "Alle" : category;

      if(category) {
        this.getProductsByCategory(category);
      }
      else {
        this.getAllProducts();
      }
    });
  }

  getProductsByCategory(category) {
    this.spinnerService.show();
    const products = this.productService.getProductsByCategory(category);
    products.snapshotChanges().subscribe(
      product => {
        this.spinnerService.hide();
        this.productList = [];
        product.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          console.log(y["$key"]);
          this.productList.push(y as Product);
        });
      },
      err => {
        const toastOption: ToastOptions = {
          title: "Bei der Anfrage der Produkte ist ein Fehler unterlaufen.",
          msg: err,
          showClose: true,
          timeout: 5000,
          theme: "material"
        };
        this.toastyService.error(toastOption);
      }
    );
  }

  getAllProducts() {
    this.spinnerService.show();
    const products = this.productService.getProducts();
    products.snapshotChanges().subscribe(
      product => {
        this.spinnerService.hide();
        this.productList = [];
        product.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          this.test = y;
          this.productList.push(y as Product);
        });
      },
      err => {
        const toastOption: ToastOptions = {
          title: "Bei der Anfrage der Produkte ist ein Fehler unterlaufen",
          msg: err,
          showClose: true,
          timeout: 5000,
          theme: "material"
        };
        this.toastyService.error(toastOption);
      }
    );
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  toggleAddProducts(any) {
    this.showAddProducts = !this.showAddProducts;
  }

  toggleUpdateProduct(key: string, product: Product) {
    this.keyToUpdate = key;
    this.productToUpdate = product;
    this.showUpdateProducts = !this.showUpdateProducts;
  }
}
