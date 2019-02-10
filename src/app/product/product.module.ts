// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// configuration and services
import { ProductRoutes } from "./product.routing";
// import { FooterComponent } from "../index/footer/footer.component";

// Components
import { CheckoutModule } from "./checkout/checkout.module";

import { ProductComponent } from "./product.component";
import { BestProductComponent } from "./best-product/best-product.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { SharedModule } from "../shared/shared.module";
import { FavouriteProductsComponent } from "./favourite-products/favourite-products.component";
import { CartProductsComponent } from "./cart-products/cart-products.component";
import { CartCalculatorComponent } from "./cart-calculator/cart-calculator.component";
import { ProductListIntroComponent } from "./product-list-intro/product-list-intro.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProductRoutes),
    SharedModule,
    CheckoutModule,
    BrowserAnimationsModule
  ],
  declarations: [
    ProductComponent,
    BestProductComponent,
    ProductListComponent,
    AddProductComponent,
    ProductDetailComponent,
    FavouriteProductsComponent,
    CartProductsComponent,
    CartCalculatorComponent,
    ProductListIntroComponent,
    // FooterComponent
  ],
  exports: [BestProductComponent]
})
export class ProductModule {}
