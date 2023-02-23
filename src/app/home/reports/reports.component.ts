import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'reports',
    templateUrl: 'reports.component.html',
    styleUrls: ['reports.component.scss']
})
export class ReportsComponent {
    manuals = [
        { name: "Provide multi-sectoral assistance project", url: "provide-multi-sectoral-assistant-project" },
        { name: "Number of benenficires ", url: "number-of-bens" },
        {
            name: 'Centers of services', url: "centers"
        },
        {
            name: "Services/activities update", url: "service-activity-updates",
        },
        {
            name: "Needs ", url: "needs", 
        },
    ]

    lang = localStorage.getItem('language')

    constructor(private router: Router) {

    }
    navTo(url: string) {
        this.router.navigate([`${this.lang}/home/reports/${url}`])
    }
    back() {
            this.router.navigate([`${this.lang}/home`])
    }
}