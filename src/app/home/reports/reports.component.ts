import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'reports',
    templateUrl:'reports.component.html',
    styleUrls:['reports.component.scss']
})
export class ReportsComponent{
    manuals = [
        {name:"Camp Needs over all Sectors levels",url:"#"},
        {name:"Camp Needs over each Sector level ",url:"#"},
        {name:`Number of Bens , Families , Childs , Males ,
        females , Educated Bens , experts … etc.`,url:"#"},
        {name:"Number of tents",url:"#"},
        {name:"centers and Services ",url:"#"},
        {name:"updates of provided services and activities ",url:"#"},
         ]
    constructor(private router:Router){

    }
    navTo(url:string){

    }
    back(){
        this.router.navigate([''])
    }
}