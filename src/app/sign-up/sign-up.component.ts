import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@upupa/auth";
import { SnackBarService } from "@upupa/common";
import { DataService } from "@upupa/data";
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
  constructor(private router: Router, 
    private appService: AppService,
    private auth:AuthService,
    private ds:DataService,
    public snack: SnackBarService,
    ) {}

   ngOnInit() {
    // this.departments =  this.appService.departments?.slice() ?? [
    //   { id: "default", name: "default" },
    // ];
    // this.camps =  this.appService.camps?.slice() ?? [
    //   { id: "default", name: "default" },
    // ];
  }

  
  async onSubmit($event) {

    
      $event.preventDefault();

      

      try {
          const user: any = { ...this.form };
          delete user.password;
          delete user.confirmPassword;


          let value = user;



          let res = await this.auth.signup(value, this.form.password);
          console.log(res)
          let res2: any = await this.auth.signin({ email: user.email.toLowerCase(), password: this.form.password });
          this.snack.openSuccess('signed up!!');
          await this.ds.put(`profile/${res2.sub}`, { username: this.form.email, email: this.form.email })
          const redirectTo = '/en/home';
          if (redirectTo.startsWith('http://') || redirectTo.startsWith('https://')) document.location.href = redirectTo;
          else this.router.navigateByUrl(redirectTo)
      }
      catch (error) {


          if (error.status == 500) {
              const e = error.json();
              if (e.message && e.message.indexOf("duplicate key") > -1) {
                  if (e.message.indexOf("index: email") > -1) this.snack.openFailed('duplicate-email');
                  else if (e.message.indexOf("index: username") > -1) this.snack.openFailed('duplicate-username');
                  else if (e.message.indexOf("index: phone") > -1) this.snack.openFailed('duplicate-phone');
                  else this.snack.openFailed('not-saved');
              }
          }
          else this.snack.openFailed('not-saved');

      }
  
    

  }
  navTo(route: string) {
    this.router.navigate([this.lang, route]);
  }
}
