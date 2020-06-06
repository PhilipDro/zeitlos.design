export class Article {
  $key: string;
  articleId: number;
  articleTagline: string;
  articleTitle: string;
  articleSubTitle: string;
  articleMainText: string;
  articleButtonText: string = "Jetzt entdecken!";
  articleAdded: string;
  articleActive = true;
  articleSlider: boolean;
}
