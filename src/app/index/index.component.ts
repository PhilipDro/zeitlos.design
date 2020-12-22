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
  articleList: Article[];
  article: Article;
  articleShow: boolean;
  //counter: number = 0;

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
    //this.getArticles(); TODO

    //this.sliderCounter();
  }

  getArticles() {
    // this.spinnerService.show();
    const articles = this.staticContentService.getArticles();
    articles.snapshotChanges().subscribe(
      article => {
        // this.spinnerService.hide();
        this.articleList = [];
        article.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          this.articleList.push(y as Article);
          this.runSlider();
          console.log("length: " + this.articleList.length);
        });

      },
      err => {
        console.log(err);
      }
    );
  }

  // runSlider() {
  //   this.articleList[this.counter].articleVisible = false;
  //   this.counter++;
  //   if(this.counter > this.articleList.length) {
  //     console.log("reset");
  //     this.counter = 0;
  //
  //     this.sliderArticles();
  //   }
  //   this.sliderArticles();
  // }
  //
  // runSlider() {
  //   this.counter = 1;
  //   this.articleList[this.counter].articleVisible = true;
  // }
  //
  // sliderArticles() {
  //    this.articleList[this.counter].articleVisible = true;
  //    setTimeout(this.runSlider(), 2000);
  // }

  // TODO
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
}
