import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Camp } from "src/app/model";
import { AppService } from "src/app/providers/app.service";

@Component({
    selector: 'complaints',
    templateUrl: 'complaints.component.html',
    styleUrls: ['complaints.component.scss']
})
export class ComplaintsComponent {
    lang = localStorage.getItem('language')
    camp: Camp
    constructor(private router: Router, private appSrvs: AppService) {
    }
     ngOnInit() {

        const currentCampId =  this.appSrvs.currentCampId
        this.camp = {...this.appSrvs.camps.find(c=>c._id == currentCampId)}
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