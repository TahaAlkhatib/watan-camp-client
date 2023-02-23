import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent {
    constructor(private router: Router) { }
    goTo(route: string) {
        setTimeout(() => {
            const lang = localStorage.getItem('language')
            this.router.navigate([`${lang}/home/${route}`])
        }, 150);
    }
}