import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController } from '@ionic/angular';

import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

import { Storage } from '@ionic/storage';
import { AppService } from "../providers/app.service";
import { AuthService } from "@upupa/auth";

@Component({
    selector: "admin-layout",
    templateUrl: "./admin-layout.component.html",
    styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
    appPages = [
        {
            title: 'Forms',
            url: 'forms',
            prefix: '/app/tabs/',
            icon: 'calendar',
            open: false,
            children: [
                {
                    title: 'Payment Orders',
                    url: 'payment-order/payment-order-list',
                    icon: 'document'
                },
                {
                    title: 'Payment Request',
                    url: 'payment-request/payment-request-list',
                    icon: 'document'
                },
                {
                    title: 'Purchase Request',
                    url: 'purchase-request/purchase-request-list',
                    icon: 'document'
                },
                {
                    title: 'Advance',
                    url: 'advance/advance-list',
                    icon: 'document'
                },
                {
                    title: 'Daily-leave',
                    url: 'daily-leave/daily-leave-list',
                    icon: 'document'
                },
                {
                    title: 'Hourly-leave',
                    url: 'hourly-leave/hourly-leave-list',
                    icon: 'document'
                },
                {
                    title: 'Justify-absence',
                    url: 'justify-absence/justify-absence-list',
                    icon: 'document'
                }

            ]
        },
        {
            title: 'Account',
            url: 'account',
            prefix: '/',
            icon: 'people',
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
            prefix: '/admin/',
            icon: 'map',
            open: false,
            children: [
                {
                    title: 'Camp',
                    url: 'camp/camp-list',
                    icon: 'document'
                },
                {
                    title: 'Forms Template',
                    url: 'forms-template/forms-template-list',
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
        private auth: AuthService
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

            if (true) {//this.appService.isDepartmentManger() || this.appService.isAccountant() || this.appService.isManagement()) {
                let page = this.appPages.find(p => p.title == "Forms To Approve")
                if (!page)
                    this.appPages.splice(1, 0, {
                        title: 'Forms To Approve',
                        url: 'forms/forms-to-approve',
                        prefix: '/app/tabs/',
                        icon: 'information-circle',
                        open: false
                    })
            }
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




    logout() {
        this.auth.signout();
    }


    openTutorial() {
        this.menu.enable(false);
        this.storage.set('ion_did_tutorial', false);
        this.router.navigateByUrl('/tutorial');
    }
}
