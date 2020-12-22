import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { Article } from "../../models/article";
import { AuthService } from "../../services/auth.service";
import { ArticleService } from "../../services/article.service";
import { NgForm } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
// import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";
import { ActivatedRoute } from "@angular/router";
import { NotificationService} from "../../services/notification.service";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  path;
  key: string;
  article: Article;
  articleList: Article[];
  showAddArticles = false;
  showUpdateArticles = false;
  articleToUpdate: Article;
  keyToUpdate: string;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    // private spinnerService: LoaderSpinnerService,
    private notificationService: NotificationService,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) { }

  ngOnInit() {
    this.getAllArticles();
  }

  getAllArticles() {
    // this.spinnerService.show();
    const articles = this.articleService.getArticles();
    articles.snapshotChanges().subscribe(
      article => {
        // this.spinnerService.hide();
        this.articleList = [];
        article.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          this.articleList.push(y as Article);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  updateArticle(updateArticleForm: NgForm) {
    this.article = new Article();
    this.article.articleId = updateArticleForm.value["articleId"] || "";;
    this.article.articleTagline = updateArticleForm.value["articleTagline"] || "";
    this.article.articleTitle = updateArticleForm.value["articleTitle"] || "";
    this.article.articleSubTitle = updateArticleForm.value["articleSubTitle"] || "";
    this.article.articleMainText = updateArticleForm.value["articleMainText"] || "";
    this.article.articleActive = updateArticleForm.value["articleActive"] || "";
    this.article.articleSlider = updateArticleForm.value["articleSlider"] || "";
    this.article.articleButtonText = updateArticleForm.value["articleButtonText"] || "";

    this.articleService.updateArticle(this.key, this.article);

    console.log("------------------------------------------------------");
    console.log("Artikel " + updateArticleForm.value["articleTitle"] + " wurde erfolgreich aktualisiert.");

    //    this.updated.emit(null);
  }

}
