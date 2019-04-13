import { Component, OnInit } from "@angular/core";
import { Product } from "../../shared/models/product";
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
// import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";
import { ActivatedRoute } from "@angular/router";
import { NotificationService} from "../../shared/services/notification.service";

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
  discountPrice: number;

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
    // private spinnerService: LoaderSpinnerService,
    private notificationService: NotificationService
  ) {
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
    // this.spinnerService.show();
    const products = this.productService.getProductsByCategory(category);
    products.snapshotChanges().subscribe(
      product => {
        // this.spinnerService.hide();
        this.productList = [];
        product.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          console.log(y["$key"]);
          this.productList.push(y as Product);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  getAllProducts() {
    // this.spinnerService.show();
    const products = this.productService.getProducts();
    products.snapshotChanges().subscribe(
      product => {
        // this.spinnerService.hide();
        this.productList = [];
        product.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          this.productList.push(y as Product);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  removeProduct(key: string) {
    this.productService.deleteProduct(key);
  }

  addFavourite(product: Product) {
    this.productService.addFavouriteProduct(product);
    console.log("Wrong?");
    this.notificationService.error("Error while fetching Products", "Second");
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

  removeUpdateForm(event) {
    this.showUpdateProducts = false;
  }

  // TODO: create a service for that.
  moveToTop() {
    // window.scrollTo(0, 0);
  }
}
