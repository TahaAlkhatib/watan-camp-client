import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AwarenessComponent } from './awareness/awareness.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
