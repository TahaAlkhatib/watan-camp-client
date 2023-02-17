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
        { sector: 'CCCM', needs: 'Rain drainage, road maintenance, sewage maintenance, fuel supply for water pumping stations_insulators.' },
        { sector: 'FSL', needs: 'Distributing food baskets _ distributing Cash_ Extending bread distribution service' },
        { sector: 'Health', needs: `Providing More types of medicine _ Children's clinic _ Extending the center's services _ Providing malnutrition treatment services` },

    ]
    back() {
        this.router.navigate(['en/home/reports'])
    }
}