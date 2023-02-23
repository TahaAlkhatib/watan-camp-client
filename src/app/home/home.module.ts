import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { AwarenessComponent } from "./awareness/awareness.component";
import { BensComponent } from "./bens/bens.component";
import { HealthCareComponent } from "./bens/health-care/health-care.component";
import { LearningAndTrainingComponent } from "./bens/learning-and-training/learning-and-training.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { CentersComponent } from "./reports/centers/centers.component";
import { NeedsComponent } from "./reports/needs/needs.component";
import { NumberOfBensComponent } from "./reports/number-of-bens/number-of-bens.component";
import { ProvideMultiSectoralComponent } from "./reports/provide-multi-sectoral/provide-multi-sectoral.component";
import { ReportsComponent } from "./reports/reports.component";
import { ServicesActivityUpdatesComponent } from "./reports/service-activity-updates/service-activity-updates.component";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ComplaintsComponent } from "./complaints/complaints.component";
import { ComplaintFormComponent } from "./complaints/complaint-form/complaint-form.component";
import { FormsModule } from "@angular/forms";

const materials = [MatIconModule]
@NgModule({
    imports: [
        ...materials,
        HomeRoutingModule,
        PdfViewerModule,
        CommonModule,
        FormsModule],
    declarations: [
        HomeComponent,
        AwarenessComponent,
        ReportsComponent,
        HealthCareComponent,
        BensComponent,
        LearningAndTrainingComponent,
        ProvideMultiSectoralComponent,
        NumberOfBensComponent,
        CentersComponent,
        ServicesActivityUpdatesComponent,
        NeedsComponent,
        ComplaintsComponent,
        ComplaintFormComponent
    ]

})
export class HomeModule {

}