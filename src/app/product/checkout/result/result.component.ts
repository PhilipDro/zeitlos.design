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
import { ToastyService, ToastOptions, ToastyConfig } from "ng2-toasty";
import { Order}  from "../../../shared/models/order";

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

  constructor(
    private productService: ProductService,
    private shippingService: ShippingService,
    private billingService: BillingService,
    private orderService: OrderService,
    private authService: AuthService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
  ) {

    this.products = productService.getLocalCartProducts();
    // this.shipping = shippingService.getshippingById("-LafG5MrHMx69hLTnGoT");

    this.products.forEach(product => {
      this.totalPrice += product.productPrice;
    });
    this.mwst = this.totalPrice * this.tax;
    this.date = Date.now();

    this.loggedUser = this.authService.getLoggedInUser();
    this.shipping = shippingService.getShippingOfUser(this.loggedUser.$key);
    console.log("Thats the new shipping: " + this.shipping);

    this.getAllBillings();
    this.getAllShippings();
    /**
     * Create Order.
     */
    this.order = new Order();
    // this.order.$key = "sdf3fq3f4f3423f";
    this.order.orderId = 222;
    this.order.userId = this.loggedUser.$key;
    this.order.shippingId = this.shippingsList[0].$key;
    this.order.billingId = this.billingsList[0].$key;
    this.order.products = this.products;

    this.orderService.createOrder(this.order);
    console.log('The order: ' + this.order);
    console.log('The Type: ' + typeof this.shippingsList);
    console.log('The Type:!!!!!!!!!!!!!!!!!!!!!!!!!');
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
          this.shippingsList.push(y as UserDetail);
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
        this.toastyService.error(toastOption);
      }
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
          this.billingsList.push(y as Billing);
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
        this.toastyService.error(toastOption);
      }
    );
  }

  downloadReceipt() {
    const data = document.getElementById("receipt");
    console.log(data);

    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("rechnung.pdf"); // Generated PDF
    });
  }
}
