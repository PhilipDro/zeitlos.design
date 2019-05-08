import {AfterViewChecked, Component, OnDestroy, OnInit} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  destroy: boolean = false;

  constructor(
    private title: Title,
    private meta: Meta,
  ) {
  }

  ngOnInit() {
    this.title.setTitle('Art Deco, Bauhaus, Moderne. Hochwertig aufgearbeitete Produkte zum Teil bis zu 30% reduziert. Jetzt entdecken!');
  }

}
