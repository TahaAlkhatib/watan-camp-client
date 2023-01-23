import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DialogService } from "@upupa/common";
import { DynamicDialogComponent } from "src/app/dialogs/dynamic-dialog/dynamic-dialog.component";
export enum btnType {
    VIDEO ,
    HTML_CONTENT,
    URL
}
@Component({
    selector: 'bens',
    templateUrl: 'bens.component.html',
    styleUrls: ['bens.component.scss']
})
export class BensComponent {
    btns = [
        { type: btnType.HTML_CONTENT, name: "Contact Camp Management", context: `<h1>hello</h1>
        <p>this is paragraph</p>` },
        { type: btnType.VIDEO, name: "Camp location", context: "https://www.youtube.com/watch?v=dj4VoPO-2pE" },
        { type: '', name: "Emergency contacts", context: "#" },
        { type: btnType.URL, name: "Health care", context: "home/bens/health-care" },
        { type: '', name: "Learning and training", context: "learning-and-training" },
        { type: '', name: "WATAN services ", context: "#" },
        { type: '', name: "Local and International News ", context: "#" },
        { type: '', name: "File a complaint ", context: "#" },
        { type: '', name: "Where am I ", context: "#" },
    ]
    constructor(private router: Router, private dialog: DialogService) {

    }
    exec(type: btnType, context: string) {
        setTimeout(()=>{
            switch (type) {
                case btnType.URL:
                    this.router.navigate([context])
                    break;
                case btnType.HTML_CONTENT:
                    this.dialog.open(DynamicDialogComponent,{data:{inputs:{type:'htmlContent',context}}})
    
                    break;
                case btnType.VIDEO:
                    this.dialog.open(DynamicDialogComponent,{autoFullScreen:false,data:{inputs:{type:'video',context}}})
    
    
                    break;
                default:
                    break;
            }
        },150)
        
    }
    back() {
        setTimeout(() => {
            this.router.navigate([''])
        }, 200);
    }
}
