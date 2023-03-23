import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DialogService } from "@upupa/common";
import { DynamicDialogComponent } from "src/app/dialogs/dynamic-dialog/dynamic-dialog.component";
import { AppService } from "src/app/providers/app.service";
export enum btnType {
    VIDEO ,
    HTML_CONTENT,
    URL,
    PDF
}
@Component({
    selector: 'bens',
    templateUrl: 'bens.component.html',
    styleUrls: ['bens.component.scss']
})
export class BensComponent {
    lang = localStorage.getItem('language')
    btns = [
        {  name: "Contact Camp Management", url: 'becon' },
        {  name: "Camp location", url: "becam" },
        {  name: "Emergency contacts", url: "beeme" },
        {  name: "Health care", context:'health-care'},
        {  name: "Learning and training", url: "learning-and-training" },
        {  name: "WATAN services", url: "bewat" },
        {  name: "Local and International News", url: "beloc" },
    ]
    constructor(private router: Router, private dialog: DialogService,private appService:AppService) {

    }

    navTo(url:string){
        this.router.navigate([this.lang,'home','bens',url])
    }
    navToUrl(url:string){
        this.router.navigate([this.lang,'home','view-content',url])

    }
    back() {
        setTimeout(() => {
            this.router.navigate([`${this.lang}/home`])
        }, 200);
    }
}
