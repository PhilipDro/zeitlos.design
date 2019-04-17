import { ProductService } from "./../../../shared/services/product.service";
import { Product } from "./../../../shared/models/product";
import { BillingService } from "./../../../shared/services/billing.service";
import { Component, OnInit } from "@angular/core";
import { Billing } from "../../../shared/models/billing";
import { UserDetail, User } from "../../../shared/models/user";
import { AuthService } from "../../../shared/services/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "app-billing-details",
  templateUrl: "./billing-details.component.html",
  styleUrls: ["./billing-details.component.scss"]
})
export class BillingDetailsComponent implements OnInit {
  loggedUser: User;
  userDetails: User;
  products: Product[];
  userDetail: UserDetail;
  billingsList: Billing[];

  constructor(
    authService: AuthService,
    private billingService: BillingService,
    productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    /* Hiding Billing Tab Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("billingTab").style.display = "none";
    document.getElementById("billingTab").style.display = "block";
    document.getElementById("resultTab").style.display = "none";

    this.userDetail = new UserDetail();
    this.products = productService.getLocalCartProducts();
    this.userDetails = authService.getLoggedInUser();
    this.loggedUser = authService.getLoggedInUser();

    this.getBilling();
  }

  ngOnInit() {}

  updateBillingDetails(form: NgForm) {

    try {
      const data = form.value;

      data["emailId"] = this.userDetails.emailId;
      data["userId"] = this.userDetails.$key;
      let totalPrice = 0;
      const products = [];
      this.products.forEach(product => {
        delete product["$key"];
        totalPrice += product.productPrice;
        products.push(product);
      });

      data["products"] = products;

      data["totalPrice"] = totalPrice;

      data["billingDate"] = Date.now();

      this.billingService.createBillings(data);

      this.router.navigate([
        "checkouts",
        { outlets: { checkOutlet: ["result"] } }
      ]);

      this.toastr.success("Rechnungsdaten erfolgreich aufenommen!");
    }
    catch(err) {
      this.toastr.error("Bitte füllen Sie alle Felder aus.");
    }
  }

  getBilling() {
    const billings = this.billingService.getBillingOfUser(this.loggedUser.$key);
    billings.snapshotChanges().subscribe(
      billing => {
        this.billingsList = [];
        billing.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          this.billingsList.push(y as Billing);

          // map observable outcome to user properties.
          // There will be only one billing entry at time.
          this.userDetail.firstName = y["firstName"];
          this.userDetail.lastName = y["lastName"];
          this.userDetail.address1 = y["address1"];
          this.userDetail.address2 = y["address2"];
          this.userDetail.zip = y["zip"];
          this.userDetail.city = y["city"];
        });
      },
      err => {
        console.log("Bei der Anfrage der Produkte ist ein Fehler unterlaufen" + err);
      }
    );
  }
}
