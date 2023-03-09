import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@upupa/auth";
import { LanguageService } from "@upupa/language";

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent {
    isLoggedIn: boolean = false
    user:any = {
        avatar: null,
        username: 'default user',
        email: 'default@default.com',
        address: 'default address',
        phone: '+90 xxx xxx xx xx',
        role: "employee, ben, doner",
        dateOfBirth: new Date(),
        camp: 'default camp',
        department: 'default',
    }
    constructor(private router: Router, private lang: LanguageService, private auth: AuthService) {

    }


    async ngOnInit() {
        // const token = localStorage.getItem('token')
        // if(token) this.isLoggedIn = true 
        this.auth.user$.subscribe(u => {
            console.log(u);

            this.isLoggedIn = u ? true : false;
            if (u) this.user = u;
        })

    }
    navToSginIn() {
        this.router.navigateByUrl(`${this.lang.language}/sign-in`)
    }

}