import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector:'learning-and-training',
    templateUrl:'learning-and-training.component.html',
    styleUrls:['learning-and-training.component.scss']
})
export class LearningAndTrainingComponent{
    lang = localStorage.getItem('language')
    btns = [
        {name:"General Sports Exercises",url:"#"},
        {name:"General nutritional Program",url:"#"},
        {name:"specialist contact info",url:"#"}
         ]
    constructor(private router:Router){

    }
    navTo(url:string){

    }
    
    back() {
        setTimeout(() => {
        this.router.navigate([`${this.lang}/home/bens`])
        }, 200);
    }
}