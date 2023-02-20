import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ChooseCampComponent } from './choose-camp/choose-camp.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const CAMP = localStorage.getItem('camp')
const lang = localStorage.getItem('language')

const routes: Routes = [
    {
        path: '',
        redirectTo: CAMP?`/${lang??'en'}/home`:`/${lang??'en'}/choose-camp`,
        pathMatch: 'full'
    },
    {
        path: `${lang??'en'}/sign-in`,
        component: SignInComponent
    }
    ,
    {
        path: `${lang??'en'}/sign-up`,
        component: SignUpComponent
    }
    ,
    {
        path: `${lang??'en'}/home`,
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: `${lang??'en'}/choose-camp`,
        component:ChooseCampComponent
    },
    {
        path: `${lang??'en'}/account`,
        component: AdminLayoutComponent,
        loadChildren: () => import('./account/account.module').then(m => m.AccountsModule)
    },
    {
        path: `${lang??'en'}/admin-tabs`,
        component: AdminLayoutComponent,
        loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
    },
    {
        path: `${lang??'en'}/admin`,
        component: AdminLayoutComponent,
        loadChildren: () => import('./admin-panel/admin.module').then(m => m.AdminModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
