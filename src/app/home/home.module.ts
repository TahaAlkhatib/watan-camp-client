import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AwarenessComponent } from "./awareness/awareness.component";
import { BensComponent } from "./bens/bens.component";
import { HealthCareComponent } from "./bens/health-care/health-care.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { ReportsComponent } from "./reports/reports.component";

@NgModule({
    imports: [
        HomeRoutingModule,
        CommonModule],
    declarations: [
        HomeComponent,
        AwarenessComponent,
        ReportsComponent,
        HealthCareComponent,
        BensComponent]

})
export class HomeModule {

}