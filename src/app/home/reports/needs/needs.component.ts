import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'needs',
    templateUrl: 'needs.component.html',
    styleUrls: ['needs.component.scss']
})
export class NeedsComponent {
    constructor(private router: Router) { }
    data = [
        { sector: 'CCCM', needs: ['Rain drainage', 'road maintenance', 'sewage maintenance', 'fuel supply for water pumping stations_insulators.'] },
        { sector: 'FSL', needs: ['Distributing food baskets', 'distributing Cash', 'Extending bread distribution service' ]},
        { sector: 'Health', needs: ['Providing More types of medicine', "Children's clinic" ,"Extending the center's services", "Providing malnutrition treatment services"] },

    ]
    back() {
        const lang = localStorage.getItem('language')
        this.router.navigate([`${lang}/home/reports`])
    }
}