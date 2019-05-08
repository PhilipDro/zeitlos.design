import { Product } from "../../../shared/models/product";
import { ProductService } from "../../../shared/services/product.service";
import { ShippingService } from "../../../shared/services/shipping.service";
import { BillingService } from "../../../shared/services/billing.service";
import { OrderService } from "../../../shared/services/order.service";
import { Component, OnInit } from "@angular/core";
import { User, UserDetail } from "../../../shared/models/user";
import { Billing } from "../../../shared/models/billing";
import { AuthService } from "../../../shared/services/auth.service";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { Order} from "../../../shared/models/order";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"]
})
export class ResultComponent implements OnInit {
  loggedUser: User;
  products: Product[];
  shipping;
  billing;
  date: number;
  totalPrice = 0;
  mwst = 0;
  tax = 0.16;
  shippingsList: UserDetail[];
  billingsList: Billing[];
  order: Order;
  orderCreated = false;
  latestShipping;
  latestBilling;
  orderSent = false;

  constructor(
    private productService: ProductService,
    private shippingService: ShippingService,
    private billingService: BillingService,
    private orderService: OrderService,
    private authService: AuthService,
  ) {

    this.products = productService.getLocalCartProducts();

    this.products.forEach(product => {
      this.totalPrice += product.productPrice;
    });
    this.mwst = this.totalPrice * this.tax;
    this.date = Date.now();

    this.loggedUser = this.authService.getLoggedInUser();
    this.shipping = shippingService.getShippingOfUser(this.loggedUser.$key);
    console.log("Thats the new shipping: " + this.shipping);

    this.order = new Order();

    this.getAllBillings();
    this.getAllShippings();
  }

  ngOnInit() {
  }

  getAllShippings() {
    const shippings = this.shippingService.getShippingOfUser(this.loggedUser.$key);
    shippings.snapshotChanges().subscribe(
      shipping => {
        this.shippingsList = [];
        shipping.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          this.order.shippingId = y["$key"];

          if (this.order.shippingId && this.order.billingId) {
            this.createOrder();
          }
          this.shippingsList.push(y as UserDetail);
        });
      },
      err => {
        console.log("Bei der Anfrage der Produkte ist ein Fehler unterlaufen");
      },
      () => console.log("shipping observable complete")
    );
  }

  getAllBillings() {
    const billings = this.billingService.getBillingOfUser(this.loggedUser.$key);
    billings.snapshotChanges().subscribe(
      billing => {
        this.billingsList = [];
        billing.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          this.order.billingId = y["$key"];

          if (this.order.shippingId && this.order.billingId) {
            this.createOrder();
          }
          this.billingsList.push(y as Billing);
        });
      },
      err => {
        console.log("Bei der Anfrage der Produkte ist ein Fehler unterlaufen" + err);
      },
      () => console.log("billing observable complete")
    );
  }

  createOrder() {
    if(!this.orderSent) {
      /**
       * Create Order.
       */
      // Workaround: Remove $key from products because firebase does not accept "$" in strings.
      this.products.forEach(product => {
        delete product.$key;
      });

      this.order.orderId = Math.floor(Math.random() * 100000);
      this.order.userId = this.loggedUser.$key;
      this.order.products = this.products;

      if (this.order.shippingId && this.order.billingId) {
        this.orderService.createOrder(this.order);
        this.orderSent = true;
      }
    }
  }

  downloadReceipt() {
    // const data = document.getElementById("receipt");
    // console.log(data);
    //
    // html2canvas(data).then(canvas => {
    //   // Few necessary setting options
    //   const imgWidth = 208;
    //   const pageHeight = 295;
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   const heightLeft = imgHeight;
    //
    //   const contentDataURL = canvas.toDataURL("image/png");
    //   const pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
    //   const position = 0;
    //   pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
    //   pdf.save("rechnung.pdf"); // Generated PDF
    // });
  }
}
