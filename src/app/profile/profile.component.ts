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
    avatar: string
    userName: string = 'default user'
    email: string = 'default@default.com'
    address: string = 'default address'
    phone: string = '+90 xxx xxx xx xx'
    role: string = "employee, ben, doner"
    dateOfBirth: Date = new Date()
    camp: string = 'default camp'
    department: string = 'default'
    constructor(private router: Router, private lang: LanguageService, private auth: AuthService) {

    }


    async ngOnInit() {
        // const token = localStorage.getItem('token')
        // if(token) this.isLoggedIn = true 
        this.auth.user$.subscribe(u => {
            console.log(u);
            
            this.isLoggedIn = u ? true : false
        })

    }
    navToSginIn() {
        this.router.navigateByUrl(`${this.lang.language}/sign-in`)
    }

}