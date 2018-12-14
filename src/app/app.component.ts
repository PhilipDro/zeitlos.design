import { Component, OnInit } from "@angular/core";
import { UserService } from "./shared/services/user.service";
import { fadeAnimation } from "./shared/animations/fadeIntRoute";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
  title = "app";

  constructor(private userService: UserService) {}

  ngOnInit() {
  }

}
