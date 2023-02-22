import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
    selector:'choose-camp',
    templateUrl:'choose-camp.component.html',
    styleUrls:['choose-camp.component.scss']
})
export class ChooseCampComponent {
constructor(private router:Router,private dialogRef:MatDialogRef<ChooseCampComponent>){}
    setCamp(camp:string){
        localStorage.setItem('camp',camp)
        const lang = localStorage.getItem('language')
        setTimeout(() => {          
            this.router.navigate([`${lang}/home`])
            this.dialogRef.close()
        }, 200);

    }
}