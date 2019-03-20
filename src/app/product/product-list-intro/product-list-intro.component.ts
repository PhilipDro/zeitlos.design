import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-list-intro',
  templateUrl: './product-list-intro.component.html',
  // styleUrls: ['./product-list-intro.component.scss'],
  styles: [`
    h2 {
      margin-top: .3em;
    }
    .content-section {
      padding: 1em 0;
      background-image: url("assets/category-teaser/Tische.png");
      background-repeat: no-repeat;
      background-position: right;
      -webkit-filter: grayscale(50%);
      filter: grayscale(50%);
    }
  `
  ],


})
export class ProductListIntroComponent implements OnInit {
  @Input() path;
  constructor() { }

  ngOnInit() {
    console.log("path: " + this.path);
  }

}
