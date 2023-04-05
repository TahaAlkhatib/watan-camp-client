import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ReportBody } from "src/app/model";
import { AppService } from "../../../../app/providers/app.service";

@Component({
    selector: 'provide-multi-sectoral',
    templateUrl: 'provide-multi-sectoral.component.html',
    styleUrls: ['provide-multi-sectoral.component.scss']
})
export class ProvideMultiSectoralComponent {
    constructor(private router: Router, private appService: AppService) { }
    data = [{
        governorate: 'Idlib',
        district: 'Idlib',
        subsdistrict: `Ma'aret Tasmrine`,
        community: "Kafr Jales",
        site: 'WATAN camp 2 - Kafr Jalal'
    }]

    dbData: ReportBody


    ngOnInit() {
        this.dbData = this.appService.reports?.find(r=>r.campId == this.appService.currentCampId && r.section == 'remup')
        console.log(this.dbData)
    }

    back() {
        const lang = localStorage.getItem('language')
        this.router.navigate([`${lang}/home/reports`])
    }
}