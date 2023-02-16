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
            name: 'Centers of services', url: "#", data: [
                {
                    sector: 'FSL', centers: [{
                        name: 'asd',
                        governorate: 'sdf',
                        district: 'dsf',
                        subsDistrict: 'ert',
                        bakery: 'dsf'
                    }]
                },
                {
                    sector: 'health', centers: [{
                        name: 'asd',
                        governorate: 'sdf',
                        district: 'dsf',
                        subsDistrict: 'ert',
                        bakery: 'dsf'
                    }]
                }
            ]
        },
        {
            name: "Services/activities update", url: "#", data: [
                { sector: 'FSL', activities: [{ name: 'sdf', update: 'completed' }] },
                { sector: 'cccm', activities: [{ name: 'sdf', update: 'completed' }] },
                { sector: 'health', activities: [{ name: 'sdf', update: 'completed' }] },
            ]
        },
        {
            name: "Needs ", url: "#", data: [
                { sector: 'CCCM', needs: 'Rain drainage, road maintenance, sewage maintenance, fuel supply for water pumping stations_insulators.' },
                { sector: 'FSL', needs: 'Distributing food baskets _ distributing Cash_ Extending bread distribution service' },
                { sector: 'Health', needs: `Providing More types of medicine _ Children's clinic _ Extending the center's services _ Providing malnutrition treatment services` },

            ]
        },
    ]
    constructor(private router: Router) {

    }
    navTo(url: string) {
        this.router.navigate([`en/home/reports/${url}`])
    }
    back() {
        this.router.navigate([''])
    }
}