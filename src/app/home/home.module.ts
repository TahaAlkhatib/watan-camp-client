import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AwarenessComponent } from "./awareness/awareness.component";
import { BensComponent } from "./bens/bens.component";
import { HealthCareComponent } from "./bens/health-care/health-care.component";
import { LearningAndTrainingComponent } from "./bens/learning-and-training/learning-and-training.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { NumberOfBensComponent } from "./reports/number-of-bens/number-of-bens.component";
import { ProvideMultiSectoralComponent } from "./reports/provide-multi-sectoral/provide-multi-sectoral.component";
import { ReportsComponent } from "./reports/reports.component";
const materials = [MatIconModule]
@NgModule({
    imports: [
        ...materials,
        HomeRoutingModule,
        CommonModule],
    declarations: [
        HomeComponent,
        AwarenessComponent,
        ReportsComponent,
        HealthCareComponent,
        BensComponent,
        LearningAndTrainingComponent,
        ProvideMultiSectoralComponent,
        NumberOfBensComponent]

})
export class HomeModule {

}