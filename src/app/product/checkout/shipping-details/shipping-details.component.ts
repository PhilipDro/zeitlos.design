import { Product } from "../../../shared/models/product";
import { ShippingService } from "../../../shared/services/shipping.service";
import { UserDetail, User } from "../../../shared/models/user";
import { AuthService } from "../../../shared/services/auth.service";
import { Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../../shared/services/product.service";
import {ToastOptions} from "ng2-toasty";

@Component({
  selector: "app-shipping-details",
  templateUrl: "./shipping-details.component.html",
  styleUrls: ["./shipping-details.component.scss"]
})
export class ShippingDetailsComponent implements OnInit {
  loggedUser: User;
  userDetails: User;
  user: User;
  shippingsList: UserDetail[];
  userDetail: UserDetail;
  products: Product[];

  constructor(
    authService: AuthService,
    private shippingService: ShippingService,
    productService: ProductService,
    private router: Router
  ) {
    /* Hiding products Element */
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("shippingTab").style.display = "block";
    document.getElementById("productsTab").style.display = "none";
    document.getElementById("resultTab").style.display = "none";

    this.userDetail = new UserDetail();
    this.products = productService.getLocalCartProducts();
    this.userDetails = authService.getLoggedInUser();
    this.user = authService.getLoggedInUser();
    this.loggedUser = authService.getLoggedInUser();

    this.getAllShippings();
  }

  ngOnInit() {}

  updateUserDetails(form: NgForm) {
    const data = form.value;

    data["emailId"] = this.userDetails.emailId;
    /**
     * Connect instance of User to the userDetails.
     */
    data["userId"] = this.userDetails.$key;
    const products = [];

    let totalPrice = 0;

    this.products.forEach(product => {
      delete product.$key;
      totalPrice += product.productPrice;
      products.push(product);
    });

    data["products"] = products;

    data["totalPrice"] = totalPrice;

    data["shippingDate"] = Date.now();

    this.shippingService.createshippings(data);

    this.router.navigate([
      "checkouts",
      { outlets: { checkOutlet: ["billing-details"] } }
    ]);
  }

  updateShippingDetails() {
    const shippings = this.shippingService.getShippingOfUser(this.loggedUser.$key);
    shippings.snapshotChanges().subscribe(
      shipping => {
        this.shippingsList = [];
        shipping.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          this.shippingsList.push(y as UserDetail);

          // map observable outcome to user properties.
          // There will be only one shipping entry at time.
          this.userDetail.firstName = y["firstName"];
          this.userDetail.lastName = y["firstName"];
          this.userDetail.address1 = y["firstName"];
          this.userDetail.address2 = y["firstName"];
          this.userDetail.zip = y["firstName"];
          this.userDetail.city = y["firstName"];
          this.user.phoneNumber = y["firstName"];
        });
      },
      err => {
        const toastOption: ToastOptions = {
          title: "Bei der Anfrage der Produkte ist ein Fehler unterlaufen",
          msg: err,
          showClose: true,
          timeout: 5000,
          theme: "material"
        };
      }
    );
  }
}
