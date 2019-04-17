// Core Dependencies
import { RouterModule } from "@angular/router";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IndexRoutes } from "./index.routing";

import { ProductModule } from "./../product/product.module";

// Components
import { IndexComponent } from "./index.component";
import { LoginComponent } from "./login/login.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SharedModule } from "../shared/shared.module";
import { ImprintComponent } from "./imprint/imprint.component";
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CategoryTeaserComponent } from './category-teaser/category-teaser.component';
import { ConsultingComponent } from './consulting/consulting.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AgbComponent } from './agb/agb.component';

@NgModule({
  imports: [
    CommonModule,
    ProductModule,
    SharedModule,
    RouterModule.forChild(IndexRoutes)
  ],
  declarations: [
    IndexComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    ImprintComponent,
    PrivacyPolicyComponent,
    CategoryTeaserComponent,
    ConsultingComponent,
    AboutUsComponent,
    AgbComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [NavbarComponent, FooterComponent],
  providers: []
})
export class IndexModule {}
