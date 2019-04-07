import { CheckoutComponent } from "./checkout/checkout.component";
import { CartProductsComponent } from "./cart-products/cart-products.component";
import { FavouriteProductsComponent } from "./favourite-products/favourite-products.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { Routes } from "@angular/router";
import { IndexComponent } from "../index/index.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import {UpdateProductComponent} from "./update-product/update-product.component";
import {AddProductComponent} from "./add-product/add-product.component";

export const ProductRoutes: Routes = [
  {
    path: "produkte",
    children: [
      {
        path: "",
        component: IndexComponent
      },
      {
        path: "alle-produkte",
        component: ProductListComponent
      },
      {
        path: "wunschliste",
        component: FavouriteProductsComponent
      },
      {
        path: "warenkorb",
        component: CartProductsComponent
      },
      {
        path: "checkouts",
        loadChildren: "./checkout/checkout.module#CheckoutModule"
      },
      {
        path: "produkt/:id",
        component: ProductDetailComponent
      },
      {
        path: ":productCategory",
        component: ProductListComponent
      },
      {
        path: "produktbearbeitung",
        component: UpdateProductComponent
      },
      {
        path: "produkterstellung",
        component: AddProductComponent
      },
    ]
  }
]
