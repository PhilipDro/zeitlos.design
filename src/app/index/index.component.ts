import {AfterViewChecked, Component, OnDestroy, OnInit} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";

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
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.title.setTitle("Art Deco, Bauhaus, Moderne. Hochwertig aufgearbeitete Produkte zum Teil bis zu 30% reduziert. Jetzt entdecken!");
  }

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
