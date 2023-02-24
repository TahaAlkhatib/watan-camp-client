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
        {name:"Refugees Manual",url:"#"},
        {name:"Women Rights Manual",url:"#"},
        {name:"Childhood Manual",url:"#"},
        {name:"Public Health Manual",url:"#"},
        {name:"Hygiene Manual",url:"#"},
        {name:"Workers Rights Manual",url:"#"},
        {name:"Social Cohesion manual",url:"#"},
        {name:"Emergency contacts",url:"#"},
        {name:"Reporting harassment, exploitation and abuse",url:"#"},
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