import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "sign-in",
  templateUrl: "sign-in.component.html",
  styleUrls: ["sign-in.component.scss"],
})
export class SignInComponent {
  userName: string = "";
  password: string = "";
  constructor(private router: Router) {}
  lang = localStorage.getItem("language") ?? "en";

  navTo(route: string) {
    this.router.navigate([this.lang, route]);
  }
  onSubmit() {
    console.log(this.userName, this.password);
  }
}
