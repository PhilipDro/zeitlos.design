import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { Product } from "../../shared/models/product";
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
import { Meta, Title } from "@angular/platform-browser";
// import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";
import { ActivatedRoute } from "@angular/router";
import { NotificationService} from "../../shared/services/notification.service";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

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
  selectedBrand: "All";

  collapseProductFilter = false;

  startAt = "";
  endAt = "";

  page = 1;
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private productService: ProductService,
    // private spinnerService: LoaderSpinnerService,
    private notificationService: NotificationService,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
  }

  ngOnInit() {
    this.title.setTitle('Unsere Produkte reichen von originalen Klassikern des Bauhaus bis über die kunstvollen Objekte des Art Deco.');

    this.sub = this.route.params.subscribe(params => {
      const category = params["productCategory"]; // (+) converts string 'id' to a number

      this.path = !category ? "Alle" : category;

      category ? this.getProductsByCategory(category) : this.getAllProducts();

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

  searchProduct($event) {
    let q = $event.target.value;
    this.startAt = q;
    this.endAt = q + "\uf8ff";

    this.runSearch();
  }

  runSearch() {
    const products = this.productService.getSearchProducts(this.startAt, this.endAt);
    products.snapshotChanges().subscribe(
      product => {
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

  toggleCollapseProductFilter() {
    this.collapseProductFilter = !this.collapseProductFilter;
    console.log(this.collapseProductFilter);
  }

  // TODO: create a service for that.
  moveToTop() {
    if (isPlatformBrowser(this._platformId)) {
      window.scrollTo(0, 0);
    }
  }
}
