import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-list-intro',
  templateUrl: './product-list-intro.component.html',
  styleUrls: ['./product-list-intro.component.scss']
})
export class ProductListIntroComponent implements OnInit {
  @Input() path;
  fullPath: string;

  constructor() {

  }

  ngOnInit() {
    this.fullPath = "background-image: url('/assets/category-teaser/" + this.path + ".png');";
    console.log("path1: " + this.fullPath);
  }

}
