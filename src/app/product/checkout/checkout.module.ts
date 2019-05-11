import { CheckoutRoutingModule } from "./checkout.routing";
import { SharedModule } from "./../../shared/shared.module";
import { CheckoutNavbarComponent } from "./checkout-navbar/checkout-navbar.component";
import { ResultComponent } from "./result/result.component";
import { ProductsComponent } from "./products/products.component";
import { ShippingDetailsComponent } from "./shipping-details/shipping-details.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CheckoutComponent } from "./checkout.component";
import { BillingDetailsComponent } from "./billing-details/billing-details.component";
import { OrderDetailsCollectorComponent } from './order-details-collector/order-details-collector.component';

@NgModule({
  imports: [CommonModule, SharedModule, CheckoutRoutingModule],
  declarations: [
    CheckoutComponent,
    BillingDetailsComponent,
    ShippingDetailsComponent,
    ProductsComponent,
    ResultComponent,
    CheckoutNavbarComponent,
    OrderDetailsCollectorComponent,
  ],
  exports: [CheckoutComponent]
})
export class CheckoutModule {}
