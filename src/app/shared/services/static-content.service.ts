import { Injectable, OnInit, Inject } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import { Article } from "../models/article";
import { AuthService } from "./auth.service";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { NotificationService } from "./notification.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Injectable()
export class StaticContentService {

  articles: AngularFireList<Article>;
  article: AngularFireObject<Article>;

  //selectedProduct = new Product(); // TODO

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private notification: NotificationService,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.getArticles();
    // This could allow the feature of bookmarking
    // articles as a user in the future.
    // this.calculateLocalFavProdCounts();
    // this.calculateLocalCartProdCounts();
  }

  getArticles() {
    this.articles = this.db.list("articles");
    console.log(this.articles);
    return this.articles;
  }

  updateArticle(key: string, data: Article) {
    this.toastr.success("Artikel erfolgreich aktualisiert.", "",{});
    this.articles.update(key, data);
  }

  createArticle(data: Article) {
    this.articles.push(data);
  }
}
