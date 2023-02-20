import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LanguageService } from "@upupa/language";

@Component({
    selector:'choose-lanuage',
    templateUrl:'choose-lanuage.component.html',
    styleUrls:['choose-lanuage.component.scss']
})
export class ChooseLanuageComponent{

constructor(private dialogRef:MatDialogRef<ChooseLanuageComponent>,private language:LanguageService, private router:Router){
    dialogRef.disableClose = true;
}

changeLang(lang:string){
localStorage.setItem('language',lang)
this.language.language = lang
window.location.reload()
this.router.navigate([''])
this.dialogRef.close()
}
}