import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'complaints',
    templateUrl: 'complaints.component.html',
    styleUrls: ['complaints.component.scss']
})
export class ComplaintsComponent {
    lang = localStorage.getItem('language')
    constructor(private router: Router) {

    }
    navTo(url: string) {
        setTimeout(() => {
            this.router.navigate([`${this.lang}/home/complaints/${url}`])
        }, 200);
    }
    back() {
        const lang = localStorage.getItem('language')
        this.router.navigate([`${lang}/home`])
    }
}