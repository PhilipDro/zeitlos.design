import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoProductsFoundComponent } from "./components/no-products-found/no-products-found.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule, FormBuilder } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { NgxPaginationModule } from "ngx-pagination";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { NoAccessComponent } from "./components/no-access/no-access.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ServiceListComponent } from "./components/service-list/service-list.component";
import { FireBaseConfig } from "../../environments/firebaseConfigDummy";
import { FilterByBrandPipe } from "./pipes/filterByBrand.pipe";
import { ProductService } from "./services/product.service";
import { StaticContentService } from "./services/static-content.service";
import { AdminGaurd } from "./services/admin-gaurd";
import { AuthGuard } from "./services/auth_gaurd";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { ArticleService } from "./services/article.service";
import { CookieDisclaimerComponent } from "./components/cookie-disclaimer/cookie-disclaimer.component";
import { ReversePipe } from "./pipes/reverse.pipe";
import { ToastrModule } from "ngx-toastr";
import { Article } from "./models/article";
import { ArticleComponent } from "./components/article/article.component";

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDMbxW3MlwUP2vrAZVJyu7pYqZa1LthvTE"
    })
  ],
  declarations: [
    NoProductsFoundComponent,
    FilterByBrandPipe,
    NoAccessComponent,
    PageNotFoundComponent,
    ServiceListComponent,
    CookieDisclaimerComponent,
    ReversePipe,
    AdminPanelComponent,
    ArticleComponent,
    AdminPanelComponent
  ],
  exports: [
    NoProductsFoundComponent,
    FormsModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    FilterByBrandPipe,
    AgmCoreModule,
    NoAccessComponent,
    PageNotFoundComponent,
    ServiceListComponent,
    CookieDisclaimerComponent,
    ReversePipe,
    AdminPanelComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGaurd,
    ProductService,
    ArticleService,
    StaticContentService,
    UserService,
    FormBuilder,
    Article
  ]
})
export class SharedModule {}
