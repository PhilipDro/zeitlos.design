import { NgForm, EmailValidator } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../shared/services/user.service";
import { AuthService } from "../../shared/services/auth.service";
import { User } from "../../shared/models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [EmailValidator]
})
export class LoginComponent implements OnInit {
  user = {
    emailId: "",
    loginPassword: ""
  };

  errorInUserCreate = false;
  errorMessage: any;
  createUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.createUser = new User();
  }

  ngOnInit() {}

  addUser(userForm: NgForm) {
    userForm.value["isAdmin"] = false;
    this.authService
      .createUserWithEmailAndPassword(
        userForm.value["emailId"],
        userForm.value["password"]
      )
      .then(res => {
        console.log("Nutzer wird registriert.");
        setTimeout((router: Router) => {
          this.router.navigate(["/"]);
        }, 1500);
      })
      .catch(err => {
        this.errorInUserCreate = true;
        this.errorMessage = err;
        console.log("Fehler bei Erstellung neuen Nutzers.");
      });
  }

  signInWithEmail(userForm: NgForm) {
    this.authService
      .signInRegular(userForm.value["emailId"], userForm.value["loginPassword"])
      .then(res => {
        console.log("Erfolgreich eingeloggt");
        const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

        setTimeout((router: Router) => {
          this.router.navigate([returnUrl || "/"]);
        }, 1500);

        this.router.navigate(["/"]);
      })
      .catch(err => {
        console.log("logging Error: ", err);
      });
  }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then(res => {
        const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
        location.reload();
        this.router.navigate(["/"]);
      })
      .catch(err => {
        console.log("Login gescheiteret" + err);
      });
  }
}
