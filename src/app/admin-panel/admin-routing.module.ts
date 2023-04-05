import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ComplaintListComponent } from "./complaint/complaint-list/complaint.component";
import { ComplaintPreviewComponent } from "./complaint/complaint-preview/complaint-preview.component";
import { DashboardPage } from "./dashboard/dashboard-page";
import { NotificationsFormComponent } from "./notifications/notifications-form.component";
import { PageContentItemsFormComponent } from "./page-content-items/form/page-content-items-form.component";
import { PageContentItemsComponent } from "./page-content-items/list/page-content-items.component";
import { PageContentItemsPreviewComponent } from "./page-content-items/preview/page-content-items-preview.component";
import { AdminPermissionsComponent } from "./permissions/admin-permissions/admin-permissions.component";
import { ReportItemsFormComponent } from "./reports/form/report-items-form.component";
import { ReportItemsComponent } from "./reports/list/report-items.component";
import { CampFormComponent } from "./settings/camp/camp-form/camp-form.component";
import { CampComponent } from "./settings/camp/camp-list/camp.component";
import { CampPreviewComponent } from "./settings/camp/camp-preview/camp-preview.component";
import { DepartmentFormComponent } from "./settings/department/department-form/department-form.component";
import { DepartmentComponent } from "./settings/department/department-list/department.component";
import { DepartmentPreviewComponent } from "./settings/department/department-preview/department-preview.component";
import { SettingsFormComponent } from "./settings/settings/settings-form/settings-form.component";
import { SettingsComponent } from "./settings/settings/settings-list/settings.component";
import { SettingsPreviewComponent } from "./settings/settings/settings-preview/settings-preview.component";


const routes: Route[] = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPage },
    { path: 'contentitems/contentitems-list/:section', component: PageContentItemsComponent },
    { path: 'contentitems/add-contentitems/:section', component: PageContentItemsFormComponent },
    { path: 'contentitems/edit-contentitems/:section/:id', component: PageContentItemsFormComponent },
    { path: 'contentitems/preview-contentitems/:section/:id', component: PageContentItemsPreviewComponent },


    { path: 'report/report-list/:section', component: ReportItemsComponent },
    { path: 'report/add-report/:section', component: ReportItemsFormComponent },
    { path: 'report/edit-report/:section/:id', component: ReportItemsFormComponent },
    
    { path: 'complaint/complaint-list', component: ComplaintListComponent },
    { path: 'complaint/preview-complaint/:id', component: ComplaintPreviewComponent },
    { path: 'notifications', component: NotificationsFormComponent },
    {
        path: 'settings', children: [
            { path: '', redirectTo: 'general', pathMatch: 'full' },
            { path: 'camp/camp-list', component: CampComponent },
            { path: 'camp/add-camp', component: CampFormComponent },
            { path: 'camp/edit-camp/:id', component: CampFormComponent },
            { path: 'camp/preview-camp/:id', component: CampPreviewComponent },
            { path: 'department/department-list', component: DepartmentComponent },
            { path: 'department/add-department', component: DepartmentFormComponent },
            { path: 'department/edit-department/:id', component: DepartmentFormComponent },
            { path: 'department/preview-department/:id', component: DepartmentPreviewComponent },
            { path: 'settings/settings-list', component: SettingsComponent },
            { path: 'settings/add-settings', component: SettingsFormComponent },
            { path: 'settings/edit-settings/:id', component: SettingsFormComponent },
            { path: 'settings/preview-settings/:id', component: SettingsPreviewComponent },
            { path: 'settings/permissions', component: AdminPermissionsComponent }
        ]
    }

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRouterModule {

}