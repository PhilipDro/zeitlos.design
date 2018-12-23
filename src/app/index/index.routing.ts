import { LoginComponent } from "./login/login.component";
import { Routes } from "@angular/router";
import { IndexComponent } from "./index.component";
import { ImprintComponent } from "./imprint/imprint.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";

export const IndexRoutes: Routes = [
  {
    path: "index",
    children: [
      {
        path: "",
        component: IndexComponent
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "impressum",
        component: ImprintComponent
      },
      {
        path: "datenschutz",
        component: PrivacyPolicyComponent
      }
    ]
  }
];
