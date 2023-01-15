import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'health-care',
    templateUrl:'health-care.component.html',
    styleUrls:['health-care.component.scss']
})
export class HealthCareComponent{
    selection:string = 'health-care'
    btns = [
        {name:"General Sports Exercises",url:"#"},
        {name:"General nutritional Program",url:"#"},
        {name:"specialist contact info",url:"#"}
         ]
    constructor(private router:Router){

    }
    navTo(url:string){

    }
    back(){
        this.router.navigate(['home/bens'])
    }
}