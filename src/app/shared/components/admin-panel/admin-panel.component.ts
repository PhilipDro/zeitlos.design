import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { StaticContentService } from "../../services/static-content.service";
import { Article } from "../../models/article";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  article: Article = new Article();
  key: string;
  showAddArticle = true;

  constructor(
    private staticContentService: StaticContentService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  createArticle(articleForm: NgForm) {
    // this.toastr.success("Artikel " + articleForm.value["articleTitle"] + " wurde erfolgreich hinzugefügt.", "",{});
    // articleForm.value["productId"] = "PROD_" + shortId.generate();
    //articleForm.value["articleAdded"] = moment().unix();
    // if (articleForm.value["articleImageUrl"] === undefined) {
    //   articleForm.value["articleImageUrl"] =
    //     "http://via.placeholder.com/640x360/007bff/ffffff";
    // }
    this.toastr.success("Artikel wurde erfolgreich hinzugefügt.", "",{});

    /**
     * Map form values to newly generated article content.
     */
    this.article = new Article();
    this.article.articleId = articleForm.value["articleId"] || "";;
    this.article.articleTagline = articleForm.value["articleTagline"] || "";
    this.article.articleTitle = articleForm.value["articleTitle"] || "";
    this.article.articleSubTitle = articleForm.value["articleSubTitle"] || "";
    this.article.articleMainText = articleForm.value["articleMainText"] || "";
    this.article.articleActive = articleForm.value["articleActive"] || "";
    this.article.articleSlider = articleForm.value["articleSlider"] || "";
    this.article.articleButtonText = articleForm.value["articleButtonText"] || "";

    console.log(this.article.articleTitle);
    this.staticContentService.createArticle(this.article);
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

    this.staticContentService.updateArticle(this.key, this.article);

    console.log("------------------------------------------------------");
    console.log("Artikel " + updateArticleForm.value["articleTitle"] + " wurde erfolgreich aktualisiert.");

    //    this.updated.emit(null);
  }

  toggleAddArticle() {
    this.showAddArticle = !this.showAddArticle;
  }
}
