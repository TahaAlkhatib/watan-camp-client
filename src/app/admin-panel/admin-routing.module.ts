import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { DashboardPage } from "./dashboard/dashboard-page";
import { PageContentItemsFormComponent } from "./page-content-items/form/page-content-items-form.component";
import { PageContentItemsComponent } from "./page-content-items/list/page-content-items.component";
import { PageContentItemsPreviewComponent } from "./page-content-items/preview/page-content-items-preview.component";
import { CampFormComponent } from "./settings/camp/camp-form/camp-form.component";
import { CampComponent } from "./settings/camp/camp-list/camp.component";
import { CampPreviewComponent } from "./settings/camp/camp-preview/camp-preview.component";


const routes: Route[] = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPage },
    { path: 'contentitems/contentitems-list/:section', component: PageContentItemsComponent },
    { path: 'contentitems/add-contentitems/:section', component: PageContentItemsFormComponent },
    { path: 'contentitems/edit-contentitems/:section/:id', component: PageContentItemsFormComponent },
    { path: 'contentitems/preview-contentitems/:section/:id', component: PageContentItemsPreviewComponent },
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