import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { DashboardPage } from "./dashboard/dashboard-page";
import { CampFormComponent } from "./settings/camp/camp-form/camp-form.component";
import { CampComponent } from "./settings/camp/camp-list/camp.component";
import { CampPreviewComponent } from "./settings/camp/camp-preview/camp-preview.component";


const routes: Route[] = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPage },
    {
        path: 'settings', children: [
            { path: '', redirectTo: 'general', pathMatch: 'full' },
            { path: 'camp/camp-list', component: CampComponent },
            { path: 'camp/add-camp', component: CampFormComponent },
            { path: 'camp/edit-camp/:id', component: CampFormComponent },
            { path: 'camp/preview-camp/:id', component: CampPreviewComponent },
        ]
    }

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRouterModule {

}