import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";

import { MenuController, Platform, ToastController } from "@ionic/angular";

import { StatusBar } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";

import { Storage } from "@ionic/storage";
import { AppService } from "./providers/app.service";
import { DialogService } from "@upupa/common";
import { ChooseLanuageComponent } from "./choose-lanuage/choose-lanuage.component";
import { ChooseCampComponent } from "./choose-camp/choose-camp.component";
import { LanguageService } from "@upupa/language";
import { CampNameService } from "./camp-name.service";
import { NotificationService } from "./notification.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  camp :string

  loggedIn = true; //localStorage.getItem('token')

  appPages = [
    {
      title: "Schedule",
      url: "/app/tabs/schedule",
      icon: "calendar",
    },
    {
      title: "Speakers",
      url: "/app/tabs/speakers",
      icon: "people",
    },
    {
      title: "Map",
      url: "/app/tabs/map",
      icon: "map",
    },
    {
      title: "About",
      url: "/app/tabs/about",
      icon: "information-circle",
    },
  ];
  dark = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private storage: Storage,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private appService: AppService,
    private dialog: DialogService,
    private languageService: LanguageService,
    private campNameService: CampNameService,
    private notificationService:NotificationService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.camp = localStorage.getItem('campId')??'';
    this.campNameService.campName$.subscribe((camp) => {
      this.camp = camp;
    });

    this.swUpdate.available.subscribe(async (res) => {
      const toast = await this.toastCtrl.create({
        message: "Update available!",
        position: "bottom",
        buttons: [
          {
            role: "cancel",
            text: "Reload",
          },
        ],
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });

    await this.appService.getCamps();
    await this.appService.getItems();
    this.appService.getCurrentCamp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is("hybrid")) {
        StatusBar.hide();
        SplashScreen.hide();
      }
    });
    this.notificationService.initPush()

  }

  goToCampSelection(){
    this.router.navigate([this.languageService.language,'choose-camp'])
  }
  ngOnDestroy(){
    this.campNameService.campName$.unsubscribe()
  }
}
