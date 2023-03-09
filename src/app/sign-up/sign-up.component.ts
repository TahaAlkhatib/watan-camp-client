import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "../providers/app.service";

@Component({
  selector: "sign-up",
  templateUrl: "sign-up.component.html",
  styleUrls: ["sign-up.component.scss"],
})
export class SignUpComponent implements OnInit {
  departments = [{ id: "default", name: "default" },{ id: "default", name: "default" }];
  camps = [{ id: "default", name: "default" },{ id: "default", name: "default" }];
  form: {
    role: string;
    fName: string;
    lName: string;
    phone: string;
    department: string;
    sn: string;
    campId: string;
    email: string;
    password: string;
    confirmPassword: string;
  } = {
    role: "",
    fName: "",
    lName: "",
    campId: "",
    confirmPassword: "",
    department: "",
    email: "",
    password: "",
    phone: "",
    sn: "",
  };
  lang = localStorage.getItem("language") ?? "en";
  constructor(private router: Router, private appService: AppService) {}

   ngOnInit() {
    // this.departments =  this.appService.departments?.slice() ?? [
    //   { id: "default", name: "default" },
    // ];
    // this.camps =  this.appService.camps?.slice() ?? [
    //   { id: "default", name: "default" },
    // ];
  }

  
  onSubmit() {
    console.log(this.form);
  }
  navTo(route: string) {
    this.router.navigate([this.lang, route]);
  }
}
