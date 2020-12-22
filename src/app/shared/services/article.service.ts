import { Injectable, OnInit, Inject } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject} from "angularfire2/database";
import { Article } from "../models/article";
import { AuthService } from "./auth.service";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { PLATFORM_ID } from "@angular/core";
import { NotificationService } from "./notification.service";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    private notification: NotificationService,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) { }

  articles: AngularFireList<Article>;
  article: AngularFireObject<Article>;

  selectedArticle = new Article();

  createArticle(data: Article) {
    this.articles.push(data);
  }

  getArticles() {
    this.articles = this.db.list("articles");
    return this.articles;
  }

  getArticleById(key: string) {
    this.article = this.db.object("articles/" + key);
    return this.article;
  }

  updateArticle(key: string, data: Article) {
    this.toastr.success("Artikel erfolgreich aktualisiert.", "",{});
    this.articles.update(key, data);
  }

  deleteArticle(key: string) {
    if (confirm('Sicher, dass das Produkt gelöscht werden soll?')) {
      this.toastr.success("Produkt wurde entfernt.", "",{});
      this.articles.remove(key);
    } else {
      console.log("Datenbank bleibt unverändert.");
    }
  }
}
