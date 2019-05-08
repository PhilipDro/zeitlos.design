import { Product } from "../../../shared/models/product";
import { ShippingService } from "../../../shared/services/shipping.service";
import { UserDetail, User } from "../../../shared/models/user";
import { AuthService } from "../../../shared/services/auth.service";
import { Component, OnInit} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../../shared/services/product.service";
import { ToastrService} from "ngx-toastr";

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
    private router: Router,
    private toastr: ToastrService,
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

    this.getShipping();
  }

  ngOnInit() {}

  updateUserDetails(form: NgForm) {

    try {
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

      console.log("Dats de form: " + form);

      this.toastr.success("Versanddaten erfolgreich aufgenommen!");
    }
    catch (err) {
      this.toastr.error("Bitte füllen Sie alle Felder aus.");
    }
  }

  getShipping() {
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
          this.userDetail.lastName = y["lastName"];
          this.userDetail.address1 = y["address1"];
          this.userDetail.address2 = y["address2"];
          this.userDetail.zip = y["zip"];
          this.userDetail.city = y["city"];
          this.userDetail.phoneNumber = y["phoneNumber"];
        });
      },
      err => {
        console.log("Bei der Anfrage der Produkte ist ein Fehler unterlaufen");
      }
    );
  }
}
