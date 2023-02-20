import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'choose-camp',
    templateUrl:'choose-camp.component.html',
    styleUrls:['choose-camp.component.scss']
})
export class ChooseCampComponent {
constructor(private router:Router){}
    setCamp(camp:string){
        localStorage.setItem('camp',camp)
        const lang = localStorage.getItem('language')
        this.router.navigate([`${lang}/home`])

    }
}