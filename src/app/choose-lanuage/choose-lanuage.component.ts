import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LanguageService } from "@upupa/language";

@Component({
  selector: "choose-lanuage",
  templateUrl: "choose-lanuage.component.html",
  styleUrls: ["choose-lanuage.component.scss"],
})
export class ChooseLanuageComponent implements OnInit {
  constructor(private language: LanguageService, private router: Router) {


  }
  ngOnInit(): void {
    const lang = localStorage.getItem("language");
    if (lang) {
      const camp = localStorage.getItem("campId");
      if (!camp) {
        this.router.navigate([`${lang}/choose-camp`]);
      } else {
        this.router.navigate([`${lang}/home`]);
      }
    }
  }
  changeLang(lang: string) {
    localStorage.setItem("language", lang);
    this.language.language = lang;
    const camp = localStorage.getItem("campId");
    if (!camp) {
      this.router.navigate([`${lang}/choose-camp`]);
    } else {
      setTimeout(() => {
        this.router.navigate([`${lang}/home`]);
      }, 200);
    }
  }
}
