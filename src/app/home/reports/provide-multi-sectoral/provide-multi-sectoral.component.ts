import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({selector:'provide-multi-sectoral',
templateUrl:'provide-multi-sectoral.component.html',
styleUrls:['provide-multi-sectoral.component.scss']
})
export class ProvideMultiSectoralComponent {
constructor(private router:Router){}
    data = [{
     governorate: 'Idlib',
     district: 'Idlib', 
     subsdistrict: `Ma'aret Tasmrine`, 
     community: "Kafr Jales", 
     site: 'Watan camp 2 - Kafr Jalal' }]

     back() {
        this.router.navigate(['en/home/reports'])
    }
}