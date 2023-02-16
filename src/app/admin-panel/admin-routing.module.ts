import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { DashboardPage } from "./dashboard/dashboard-page";


const routes: Route[] = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardPage }

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRouterModule {

}