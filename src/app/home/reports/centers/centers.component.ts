import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ReportBody } from "src/app/model";
import { AppService } from "src/app/providers/app.service";

@Component({
    selector: 'centers',
    templateUrl: 'centers.component.html',
    styleUrls: ['centers.component.scss']
})
export class CentersComponent {
    constructor(private router: Router, private appService: AppService) { }
    data = [
        {
            sector: 'FSL',
            centers: [
                {
                    name: 'Bakery',
                    governorate: 'Idlib',
                    district: 'Harim',
                    subsDistrict: 'Dana',
                    community: 'Tal elkaramej',
                    bakery: 'WATAN Bakery'
                },
                {
                    name: 'Mill',
                    governorate: 'Idlib',
                    district: 'Idlib',
                    subsDistrict: 'Maret Mersin',
                    community: 'kafer Yahmol',
                    bakery: 'AL FAJER'
                },
                {
                    name: 'Warhouse',
                    governorate: 'Idlib',
                    district: 'Idlib',
                    subsDistrict: 'Maret Mersin',
                    community: 'Hazano',
                    bakery: 'Hazano Warhouse'
                }
            ]
        },
        {
            sector: 'health',
            centers: [
                {
                    name: 'Health facility',
                    governorate: 'Idleb',
                    district: 'Idleb',
                    subsDistrict: 'Maret mersin',
                    community: 'Kafr Jales',
                    bakery: 'Kafr Jales PHC'
                }
            ]
        }
    ]

    dbData: ReportBody


    ngOnInit() {
        this.dbData = this.appService.reports?.find(r=>r.campId == this.appService.currentCampId && r.section == 'reces')
        console.log(this.dbData)
    }
    back() {
        const lang = localStorage.getItem('language')
        this.router.navigate([`${lang}/home/reports`])
    }
}