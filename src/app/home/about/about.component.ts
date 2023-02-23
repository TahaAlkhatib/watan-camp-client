import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.scss']
})
export class AboutComponent {

    lang = localStorage.getItem('language')

    constructor(private router: Router) {

    }
    navTo(url: string) {
        this.router.navigate([`${this.lang}/home/about/${url}`])
    }
    back() {
            this.router.navigate([`${this.lang}/home`])
    }
}