import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@upupa/auth';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ChooseCampComponent } from './choose-camp/choose-camp.component';
import { ChooseLanuageComponent } from './choose-lanuage/choose-lanuage.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const lang = localStorage.getItem('language')

const routes: Routes = [
    {
        path: '',
        redirectTo: 'choose-language',
        pathMatch: 'full'
    },
    {
        path: ':lang/sign-in',
        component: SignInComponent
    }
    ,
    {
        path: ':lang/sign-up',
        component: SignUpComponent
    }
    ,
    {
        path: ':lang/profile',
        component: ProfileComponent
    }
    ,
    {
        path: ':lang/home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'choose-language',
        component:ChooseLanuageComponent
    },
    
    {
        path: ':lang/choose-camp',
        component:ChooseCampComponent
    },
    { path: ':lang/account/register-admin', component: RegisterAdminComponent },
    {
        path: ':lang/account',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./account/account.module').then(m => m.AccountsModule)
    },
    {
        path: ':lang/admin-tabs',
        component: AdminLayoutComponent,
        loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
    },
    {
        path: ':lang/admin',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin-panel/admin.module').then(m => m.AdminModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
