import { Routes } from "@angular/router";
import { IndexComponent } from "./index/index.component";
import { NoAccessComponent } from "./shared/components/no-access/no-access.component";
import { PageNotFoundComponent } from "./shared/components/page-not-found/page-not-found.component";
import { AdminPanelComponent } from "./shared/components/admin-panel/admin-panel.component";

export const AppRoutes: Routes = [
  {
    path: "",
    component: IndexComponent,
    children: [
      {
        path: "index",
        loadChildren: "./index/index.module#IndexModule"
      },
      {
        path: "produkte",
        loadChildren: "./product/product.module#ProductModule"
      },
      {
        path: "users",
        loadChildren: "./user/user.module#UserModule"
      }

    ]
  },
  { path: "", redirectTo: "/index", pathMatch: "full" },
  { path: "admin-panel", component: AdminPanelComponent },
  { path: "no-access", component: NoAccessComponent },
  { path: "**", component: PageNotFoundComponent }
];
