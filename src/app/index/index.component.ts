import { AfterViewChecked, Input, Component, OnDestroy, OnInit } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

import { AuthService } from "../shared/services/auth.service";
import { Article } from "../shared/models/article";
import { StaticContentService } from "../shared/services/static-content.service";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {

  destroy: boolean = false;

  @Input() key: string;

  constructor(
    private title: Title,
    private meta: Meta,
    private http: HttpClient,
    private toastr: ToastrService,
    public authService: AuthService,
    public article: Article,
    public staticContentService: StaticContentService
  ) {
  }

  ngOnInit() {
    this.title.setTitle("Art Deco, Bauhaus, Moderne. Hochwertig aufgearbeitete Produkte zum Teil bis zu 30% reduziert. Jetzt entdecken!");
  }

  sendMail() {
    console.log("test send mail");

    const postVars = {
      email : "me@philipdrozd.com",
      name : "Markus Aurelius",
      message : "Rhis is a message"
    };

    this.http.post("/send-mail", postVars)
      .subscribe(
        response => console.log(`This is the first response: ${response}`),
        response => console.log(`This is the second response: ${response}`)
      );
  }

  createArticle(articleForm: NgForm) {
    this.toastr.success("Artikel " + articleForm.value["articleTitle"] + " wurde erfolgreich hinzugefügt.", "",{});
    // articleForm.value["productId"] = "PROD_" + shortId.generate();
    //articleForm.value["articleAdded"] = moment().unix();
    if (articleForm.value["articleImageUrl"] === undefined) {
      articleForm.value["articleImageUrl"] =
        "http://via.placeholder.com/640x360/007bff/ffffff";
    }
  }

  updateArticle(articleForm: NgForm) {
    /**
     * Map form values to newly generated header content.
     */
    this.article = new Article();
    //his.article.articleTitle = productForm.value["articleTitle"] || "";
    this.article.articleTitle = "Titel des Artikels";

    //this.showEditHeader = false;

    console.log(this.article.articleTitle);
    // this.header.productId = productForm.value["productId"] || "";
    // this.header.productCategory = productForm.value["productCategory"] || "";
    // this.header.productMaterial = productForm.value["productMaterial"] || "";

    this.staticContentService.createArticle(this.article);

    //const date = productForm.value["articleAdded"];

    console.log("------------------------------------------------------");
    //console.log(this.product.productActive);

    //this.updated.emit(null);
  }
}
