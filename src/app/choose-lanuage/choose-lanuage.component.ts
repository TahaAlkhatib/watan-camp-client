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

constructor(private language:LanguageService, private router:Router){
}

changeLang(lang:string){
localStorage.setItem('language',lang)
this.language.language = lang
setTimeout(() => {
    this.router.navigate([`${lang}/home`])
}, 200);
}
}