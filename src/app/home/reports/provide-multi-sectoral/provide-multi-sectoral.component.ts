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
        const lang = localStorage.getItem('language')
        this.router.navigate([`${lang}/home/reports`])
    }
}