import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "sign-up",
  templateUrl: "sign-up.component.html",
  styleUrls: ["sign-up.component.scss"],
})
export class SignUpComponent {
  form: {
    selection: string;
    fName: string;
    lName: string;
    phone: string;
    department: string;
    sn: string;
    camp: string;
    email: string;
    password: string;
    confirmPassword: string;
  } = {
    selection: "",
    fName: "",
    lName: "",
    camp: "",
    confirmPassword: "",
    department: "",
    email: "",
    password: "",
    phone: "",
    sn: "",
  };
  lang = localStorage.getItem("language") ?? "en";
  constructor(private router: Router) {}

  onSubmit() {
    console.log(this.form);
  }
  navTo(route: string) {
    this.router.navigate([this.lang, route]);
  }
}
