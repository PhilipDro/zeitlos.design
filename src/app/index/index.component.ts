import {AfterViewChecked, Component, OnDestroy, OnInit} from "@angular/core";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class IndexComponent implements OnInit {
  destroy: boolean = false;

  constructor() {
  }

  ngOnInit() {}

}
