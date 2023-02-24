import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Camp } from "../model";
import { AppService } from "../providers/app.service";

@Component({
  selector: "choose-camp",
  templateUrl: "choose-camp.component.html",
  styleUrls: ["choose-camp.component.scss"],
})
export class ChooseCampComponent implements OnInit {
  camps:Camp[] = [];
  constructor(private router: Router, private appService: AppService) {}

  async ngOnInit() {
    this.camps = await this.appService.getCamps();
  }

  setCamp(camp: string) {
    localStorage.setItem("campId", camp);
    const lang = localStorage.getItem("language");
    setTimeout(() => {
      this.router.navigate([`${lang}/home`]);
    }, 200);
  }
}
