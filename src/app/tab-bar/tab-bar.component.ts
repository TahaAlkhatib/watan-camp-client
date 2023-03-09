import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@upupa/auth";
import { LanguageService } from "@upupa/language";

@Component({
    selector: 'tab-bar',
    templateUrl: 'tab-bar.component.html',
    styleUrls: ['tab-bar.component.scss']
})
export class TabBarComponent {
    lang = localStorage.getItem('language')
    constructor(private router: Router, private langService: LanguageService, private auth: AuthService) {


    }
    navTo(route: string) {
        this.router.navigate([this.lang, 'home', 'reports'])
    }

    navToMap() {
        this.router.navigateByUrl(`${this.langService.language}/home/about/map`)
    }
    navToHome() {
        this.router.navigateByUrl(`${this.langService.language}/home`)
    }
    navToProfile() {
        this.router.navigateByUrl(`${this.langService.language}/profile`)

    }

    logout() {
        if (this.auth.user) {
            this.auth.signout();
            window.location.reload()
        }

    }
}