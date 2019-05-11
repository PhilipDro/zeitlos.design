import { Injectable, OnInit, Inject } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import { Product } from "../models/product";
import { AuthService } from "./auth.service";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { NotificationService} from "./notification.service";
import {ToastrService} from "ngx-toastr";
import { Observable } from "rxjs";

@Injectable()
export class ProductService {
  products: AngularFireList<Product>;
  productsByCategory: AngularFireList<Product>;
  product: AngularFireObject<Product>;

  selectedProduct = new Product();

  // favouriteProducts
  favouriteProducts: AngularFireList<FavouriteProduct>;
  cartProducts: AngularFireList<FavouriteProduct>;

  // NavbarCounts
  navbarCartCount = 0;
  navbarFavProdCount = 0;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private notification: NotificationService,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.calculateLocalFavProdCounts();
    this.calculateLocalCartProdCounts();
  }

  // TODO add an observable approach in the future
  //  to enable reusing the component
  getProducts() {
    this.products = this.db.list("products", ref => ref.orderByChild("productId").startAt(1));
    return this.products;
  }

  getProductsByCategory(category) {
    this.productsByCategory = this.db.list("products", ref => ref.orderByChild("productCategory").equalTo(category));
    return this.productsByCategory;
  }

  createProduct(data: Product) {
    this.products.push(data);
  }

  getProductById(key: string) {
    this.product = this.db.object("products/" + key);
    return this.product;
  }

  updateProduct(key: string, data: Product) {
    this.toastr.success("Produkt erfolgreich aktualisiert.", "",{});
    this.products.update(key, data);
  }

  deleteProduct(key: string) {
    this.toastr.success("Produkt wurde entfernt.", "",{});
    console.log(key);
    this.products.remove(key);
  }

  // Get Favourite Product based on userId
  getUsersFavouriteProduct() {
    const user = this.authService.getLoggedInUser();
    this.favouriteProducts = this.db.list("favouriteProducts", ref =>
      ref.orderByChild("userId").equalTo(user.$key)
    );
    return this.favouriteProducts;
  }

  // Adding New product to favourite if logged else to localStorage
  addFavouriteProduct(data: Product): void {
    // Product Already exists
    // console.log("Das Produkt befindet sich bereits in der Wunschliste.");

    // Adding
    this.toastr.success("Produkt erfolgreich zur Wunschliste hinzugefügt", "",{});

    let a: Product[];
    if (isPlatformBrowser(this._platformId)) {
      a = JSON.parse(localStorage.getItem("avf_item")) || [];

      a.push(data);

      setTimeout(() => {
        localStorage.setItem("avf_item", JSON.stringify(a));
        this.calculateLocalFavProdCounts();
      }, 1500);
    }
  }

  // Fetching unsigned users favourite products
  getLocalFavouriteProducts(): Product[] {
    if (isPlatformBrowser(this._platformId)) {
      const products: Product[] =
        JSON.parse(localStorage.getItem("avf_item")) || [];

      return products;
    }
  }

  // Removing Favourite Product from Database
  removeFavourite(key: string) {
    this.favouriteProducts.remove(key);
  }

  // Removing Favourite Product from localStorage
  removeLocalFavourite(product: Product) {
    if (isPlatformBrowser(this._platformId)) {
      const products: Product[] = JSON.parse(localStorage.getItem("avf_item"));

      for (let i = 0; i < products.length; i++) {
        if (products[i].productId === product.productId) {
          products.splice(i, 1);
          break;
        }
      }
      // ReAdding the products after remove
      localStorage.setItem("avf_item", JSON.stringify(products));

      this.calculateLocalFavProdCounts();
    }
  }

  // Returning Local Products Count
  calculateLocalFavProdCounts() {
    this.navbarFavProdCount = !this.getLocalFavouriteProducts() ? 0 : this.getLocalFavouriteProducts().length;
  }

  /*
   ----------  Cart Product Function  ----------
  */

  // Adding new Product to cart db if logged in else localStorage
  addToCart(data: Product): void {
    if (isPlatformBrowser(this._platformId)) {
      let a: Product[];

      a = JSON.parse(localStorage.getItem("avct_item")) || [];

      a.push(data);

      this.toastr.success("Produkt erfolgreich zum Warenkorb hinzugefügt.", "",{});

      setTimeout(() => {
        localStorage.setItem("avct_item", JSON.stringify(a));
        this.calculateLocalCartProdCounts();
      }, 500);
    }
  }

  // Removing cart from local
  removeLocalCartProduct(product: Product) {
    if (isPlatformBrowser(this._platformId)) {
      const products: Product[] = JSON.parse(localStorage.getItem("avct_item"));

      for (let i = 0; i < products.length; i++) {
        if (products[i].productId === product.productId) {
          products.splice(i, 1);
          break;
        }
      }
      // ReAdding the products after remove
      localStorage.setItem("avct_item", JSON.stringify(products));

      this.calculateLocalCartProdCounts();
    }
  }

  // Fetching Locat CartsProducts
  getLocalCartProducts(): Product[] {
    if (isPlatformBrowser(this._platformId)) {
      const products: Product[] =
        JSON.parse(localStorage.getItem("avct_item")) || [];

      return products;
    }
  }

  // returning LocalCarts Product Count
  calculateLocalCartProdCounts() {
    this.navbarCartCount = !this.getLocalCartProducts() ? 0 : this.getLocalCartProducts().length;
  }
}

export class FavouriteProduct {
  product: Product;
  productId: string;
  userId: string;
}
