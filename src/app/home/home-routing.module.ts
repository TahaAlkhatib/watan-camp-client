import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AwarenessComponent } from './awareness/awareness.component';
import { BensComponent } from './bens/bens.component';
import { HealthCareComponent } from './bens/health-care/health-care.component';
import { LearningAndTrainingComponent } from './bens/learning-and-training/learning-and-training.component';
import { HomeComponent } from './home.component';
import { CentersComponent } from './reports/centers/centers.component';
import { NeedsComponent } from './reports/needs/needs.component';
import { NumberOfBensComponent } from './reports/number-of-bens/number-of-bens.component';
import { ProvideMultiSectoralComponent } from './reports/provide-multi-sectoral/provide-multi-sectoral.component';
import { ReportsComponent } from './reports/reports.component';
import { ServicesActivityUpdatesComponent } from './reports/service-activity-updates/service-activity-updates.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'awareness',
    component:AwarenessComponent
  },
  {
    path:'reports',
    component:ReportsComponent
  },
  {
    path:'reports/provide-multi-sectoral-assistant-project',
    component:ProvideMultiSectoralComponent
  },
  {
    path:'reports/number-of-bens',
    component:NumberOfBensComponent
  },
  {
    path:'reports/centers',
    component:CentersComponent
  },
  {
    path:'reports/service-activity-updates',
    component:ServicesActivityUpdatesComponent
  },
  {
    path:'reports/needs',
    component:NeedsComponent
  },
  {
    path:'bens',
    component:BensComponent
  },
  {
    path:'bens/health-care',
    component:HealthCareComponent
  },
  {
    path:'bens/learning-and-training',
    component:LearningAndTrainingComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
