import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import { Storage } from '@ionic/storage';
import { AppService } from "../providers/app.service";
import { AuthService } from "@upupa/auth";
import { LanguageService } from "@upupa/language";

@Component({
    selector: "admin-layout",
    templateUrl: "./admin-layout.component.html",
    styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
    appPages = [
        {
            title: 'Awareness',
            url: 'contentitems/contentitems-list',
            prefix: 'admin',
            icon: 'calendar',
            open: false,
            children: [
                {
                    title: 'Human Rights Manual',
                    url: 'awhum',
                    icon: 'document'
                },
                {
                    title: 'Refugees Manual',
                    url: 'awref',
                    icon: 'document'
                },
                {
                    title: 'Women Rights Manual',
                    url: 'awwom',
                    icon: 'document'
                },
                {
                    title: 'Childhood Manual',
                    url: 'awchi',
                    icon: 'document'
                },
                {
                    title: 'Public Health Manual',
                    url: 'awpub',
                    icon: 'document'
                },
                {
                    title: 'Hygiene Manual',
                    url: 'awhyg',
                    icon: 'document'
                },
                {
                    title: 'Workers Rights Manual',
                    url: 'awwor',
                    icon: 'document'
                },
                {
                    title: 'Social Cohesion manual',
                    url: 'awsoc',
                    icon: 'document'
                },
                {
                    title: 'Emergency contacts',
                    url: 'aweme',
                    icon: 'document'
                },
                {
                    title: 'Reporting harassment, exploitation and abuse',
                    url: 'awrep',
                    icon: 'document'
                }

            ]
        },{
            title: 'BENs',
            url: 'contentitems/contentitems-list',
            prefix: 'admin',
            icon: 'people',
            open: false,
            children: [
                {
                    title: 'Contact Camp Management',
                    url: 'becon',
                    icon: 'document'
                },
                {
                    title: 'Camp location',
                    url: 'becam',
                    icon: 'document'
                },
                {
                    title: 'Emergency contacts',
                    url: 'beeme',
                    icon: 'document'
                },
                {
                    title: 'Health care',
                    url: 'behea',
                    icon: 'document'
                },
                {
                    title: 'Learning and training',
                    url: 'belea',
                    icon: 'document'
                },
                {
                    title: 'WATAN services',
                    url: 'bewat',
                    icon: 'document'
                },
                {
                    title: 'Local and International News',
                    url: 'beloc',
                    icon: 'document'
                }
            

            ]
        },
        {
            title: 'Account',
            url: 'account',
            prefix: '/',
            icon: 'person',
            open: false,
            children: [
                {
                    title: 'Users',
                    url: 'user-list',
                    icon: 'document'
                },
                {
                    title: 'Roles',
                    url: 'role/role-list',
                    icon: 'document'
                }
            ]
        },
        {
            title: 'Settings',
            url: 'settings',
            prefix: 'admin',
            icon: 'map',
            open: false,
            children: [
                {
                    title: 'Camp',
                    url: 'camp/camp-list',
                    icon: 'document'
                }
            ]
        },
        {
            title: 'About',
            url: 'about',
            prefix: '/app/tabs/',
            icon: 'information-circle',
            open: false
        }
    ];
    dark = false;
    user;

    title: string

    constructor(
        private menu: MenuController,
        private platform: Platform,
        private router: Router,
        private storage: Storage,
        private swUpdate: SwUpdate,
        private toastCtrl: ToastController,
        private appService: AppService,
        private auth: AuthService,
        private langService:LanguageService
    ) {
        this.initializeApp();
    }

    async ngOnInit() {


        this.swUpdate.available.subscribe(async res => {
            const toast = await this.toastCtrl.create({
                message: 'Update available!',
                position: 'bottom',
                buttons: [
                    {
                        role: 'cancel',
                        text: 'Reload'
                    }
                ]
            });

            await toast.present();

            toast
                .onDidDismiss()
                .then(() => this.swUpdate.activateUpdate())
                .then(() => window.location.reload());
        });

        this.auth.user$.subscribe(async u => {
            await this.appService.initEmployeeInfo()
            this.user = u
            console.log('user :', this.user)
        })

        this.appService.title.subscribe(res=>this.title = res)
    }

    initializeApp() {
        this.appService.appModules.next(this.appPages);
        this.platform.ready().then(() => {
            if (this.platform.is('hybrid')) {
                StatusBar.hide();
                SplashScreen.hide();
            }
        });
    }

    navigate(p,sub){
        this.router.navigateByUrl(`en/${p.prefix}/${p.url}/${sub.url}`)
    }




    logout() {
        this.auth.signout();
    }


    openTutorial() {
        this.menu.enable(false);
        this.storage.set('ion_did_tutorial', false);
        this.router.navigateByUrl('/tutorial');
    }
}
