import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CampNameService } from "../camp-name.service";
import { Camp } from "../model";
import { AppService } from "../providers/app.service";

@Component({
  selector: "choose-camp",
  templateUrl: "choose-camp.component.html",
  styleUrls: ["choose-camp.component.scss"],
})
export class ChooseCampComponent implements OnInit {
  camps:Camp[] = [];
  constructor(private router: Router,
     private appService: AppService,
    private campNameService: CampNameService
    ) {}

  async ngOnInit() {
    this.camps = await this.appService.getCamps();
  }

  setCamp(camp: string) {
    localStorage.setItem("campId", camp);
    this.campNameService.campName$.next(camp)
    const lang = localStorage.getItem("language");
    // this.router.navigate([lang,'home']);
    window.location.href = '/'

  }
}
