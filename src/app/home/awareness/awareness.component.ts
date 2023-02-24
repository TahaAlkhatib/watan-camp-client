import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'awareness',
    templateUrl:'awareness.component.html',
    styleUrls:['awareness.component.scss']
})
export class AwarenessComponent{
    manuals = [
        {name:"Human Rights Manual",url:"awhum"},
        {name:"Refugees Manual",url:"awref"},
        {name:"Women Rights Manual",url:"awwom"},
        {name:"Childhood Manual",url:"awchi"},
        {name:"Public Health Manual",url:"awpub"},
        {name:"Hygiene Manual",url:"awhyg"},
        {name:"Workers Rights Manual",url:"awwor"},
        {name:"Social Cohesion manual",url:"awsoc"},
        {name:"Emergency contacts",url:"aweme"},
        {name:"Reporting harassment, exploitation and abuse",url:"awrep"},
    ]

    lang = localStorage.getItem('language')

    constructor(private router:Router){

    }

    
    navTo(url:string){
        this.router.navigate([this.lang,'home','view-content',url])
    }
    back(){
        this.router.navigate([`${this.lang}/home`])
    }
}