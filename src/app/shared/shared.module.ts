import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoProductsFoundComponent } from "./components/no-products-found/no-products-found.component";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule, FormBuilder } from "@angular/forms";
import { ToastyModule } from "ng2-toasty";
import { RouterModule, Router } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { NoAccessComponent } from "./components/no-access/no-access.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ServiceListComponent } from "./components/service-list/service-list.component";
import { FireBaseConfig } from "../../environments/firebaseConfigDummy";
import { FilterByBrandPipe } from "./pipes/filterByBrand.pipe";
import { ProductService } from "./services/product.service";
import { AdminGaurd } from "./services/admin-gaurd";
import { AuthGuard } from "./services/auth_gaurd";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { LoaderSpinnerService } from "./loader-spinner/loader-spinner";

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ToastyModule.forRoot(),
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDMbxW3MlwUP2vrAZVJyu7pYqZa1LthvTE"
    })
  ],
  declarations: [
    NoProductsFoundComponent,
    FilterByBrandPipe,
    NoAccessComponent,
    PageNotFoundComponent,
    ServiceListComponent
  ],
  exports: [
    NoProductsFoundComponent,
    FormsModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ToastyModule,
    RouterModule,
    NgxPaginationModule,
    FilterByBrandPipe,
    AgmCoreModule,
    NoAccessComponent,
    PageNotFoundComponent,
    ServiceListComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGaurd,
    ProductService,
    UserService,
    FormBuilder,
    LoaderSpinnerService
  ]
})
export class SharedModule {}
