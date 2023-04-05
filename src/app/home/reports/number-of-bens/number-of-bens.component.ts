import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ReportBody } from "src/app/model";
import { AppService } from "src/app/providers/app.service";

@Component({
    selector: 'number-of-bens',
    templateUrl: 'number-of-bens.component.html',
    styleUrls: ['number-of-bens.component.scss']
})
export class NumberOfBensComponent {
    constructor(private router: Router, private appService: AppService) { }
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

    dbData: ReportBody


    ngOnInit() {
        this.dbData = this.appService.reports?.find(r=>r.campId == this.appService.currentCampId && r.section == 'renub')
        console.log(this.dbData)
    }

    back() {
        const lang = localStorage.getItem('language')
        this.router.navigate([`${lang}/home/reports`])
    }
}