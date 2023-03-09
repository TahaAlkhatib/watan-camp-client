import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "@upupa/auth";
import { SnackBarService } from "@upupa/common";

@Component({
    selector: "sign-in",
    templateUrl: "sign-in.component.html",
    styleUrls: ["sign-in.component.scss"],
})
export class SignInComponent {
    userName: string = "";
    password: string = "";

    error
    constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService,public snack: SnackBarService) { }
    lang = localStorage.getItem("language") ?? "en";

    navTo(route: string) {
        this.router.navigate([this.lang, route]);
    }
    async onSubmit() {
        // console.log(this.userName, this.password);
        let reto = this.route.snapshot.queryParamMap.get('redirect') ?? ''
        this.error = null;
        try {



            await this.auth.signin({ username: this.userName, password: this.password });
            document.location.href = window.location.origin+reto;
        }
        catch (error) {

            if (error == "INVALID_ATTEMPT" || error.msg == "INVALID_ATTEMPT") this.error = "username-password-wrong";
            else if (error == "TOO_MANY_LOGIN_ATTEMPTS" || error.msg == "TOO_MANY_LOGIN_ATTEMPTS") this.error = "too-many-attempts";
            else if (error == "CONNECTION_ERROR") this.error = "connection-error";
            else this.error = 'error';
            console.error('login', error);
            this.snack.openFailed(error)
        }
    }
}
