import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'number-of-bens',
    templateUrl: 'number-of-bens.component.html',
    styleUrls: ['number-of-bens.component.scss']
})
export class NumberOfBensComponent {
    constructor(private router: Router) { }
    data = {
        ofTent: 3100,
        HHs: 2073,
        men: 2434,
        women: 2671,
        boys: 4191,
        girls: 3870,
        pwd: 221,
        individual: 13166
    }
    back() {
        const lang = localStorage.getItem('language')
        this.router.navigate([`${lang}/home/reports`])
    }
}