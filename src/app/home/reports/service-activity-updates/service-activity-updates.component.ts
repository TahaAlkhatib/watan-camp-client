import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'service-activity-updates',
    templateUrl: 'service-activity-updates.component.html',
    styleUrls: ['service-activity-updates.component.scss']
})
export class ServicesActivityUpdatesComponent {
    constructor(private router: Router) { }
    data = [
        {
            sector: 'FSL', activities:
                [{ name: 'Wheat purchase', update: 'Completed' },
                { name: 'Wheat Miling', update: 'Completed' },
                { name: 'Selling bran', update: 'Ongoing' },
                { name: 'Bread baking', update: 'Ongoing' },
                { name: 'Bread distrubition', update: 'Ongoing' }]
        },
        {
            sector: 'CCCM', activities:
                [{ name: 'CCCM Training', update: 'Completed' },
                { name: 'PSEA Training', update: 'Ongoing' },
                { name: 'RHU Maintinance', update: 'Completed' },
                { name: 'Replacing exteriting', update: 'Completed' }

                ]
        },
        {
            sector: 'Health', activities:
                [{ name: 'Medical consultations', update: 'Ongoing' },
                { name: 'Providing medicine to the Health facility', update: 'Ongoing' },
                { name: 'ICP Training', update: 'Completed' },
                { name: 'Health topic training ', update: 'Completed' },
                { name: 'Ante-Natal Care(ANC)', update: 'Ongoing' },
                { name: 'Household visits by CHWs', update: 'Ongoing' }
                ]
        },
    ]
    back() {
        this.router.navigate(['en/home/reports'])
    }
}