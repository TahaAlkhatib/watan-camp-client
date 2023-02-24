import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'tab-bar',
    templateUrl:'tab-bar.component.html',
    styleUrls:['tab-bar.component.scss']
})
export class TabBarComponent{
    lang = localStorage.getItem('language')
    constructor(private router:Router){


    }
    navTo(route:string){
this.router.navigate([this.lang,'home','reports'])
    }
}