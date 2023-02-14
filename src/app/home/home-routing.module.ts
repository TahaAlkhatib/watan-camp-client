import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfComponent } from '../pdf/pdf.component';
import { AwarenessComponent } from './awareness/awareness.component';
import { BensComponent } from './bens/bens.component';
import { HealthCareComponent } from './bens/health-care/health-care.component';
import { LearningAndTrainingComponent } from './bens/learning-and-training/learning-and-training.component';
import { HomeComponent } from './home.component';
import { ReportsComponent } from './reports/reports.component';



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
  },
  {
    path:'pdf/:pdf',
    component:PdfComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
