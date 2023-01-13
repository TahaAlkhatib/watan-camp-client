import { Component } from "@angular/core";
import { Router } from "@angular/router";
export enum btnType {
    video,
    data,
    url
}
@Component({
    selector:'bens',
    templateUrl:'bens.component.html',
    styleUrls:['bens.component.scss']
})
export class BensComponent{
    btns = [
        {type:'',name:"Contact Camp Management",context:"#"},
        {type:btnType.video,name:"Camp location",context:"#"},
        {type:'',name:"Emergency contacts",context:"#"},
        {type:'',name:"Health care",context:"health-care"},
        {type:'',name:"Learning and training",context:"learning-and-training"},
        {type:'',name:"WATAN services ",context:"#"},
        {type:'',name:"Local and International News ",context:"#"},
        {type:'',name:"File a complaint ",context:"#"},
        {type:'',name:"Where am I ",context:"#"},
         ]
    constructor(private router:Router){

    }
    exec(type:btnType,context:string){

    }
    back(){
        this.router.navigate([''])
    }
}