import { NgModule } from '@angular/core';
import { MembershipModule, PageNavigationLink } from '@upupa/membership';
import { DynamicFormModule, FormDesign, hiddenField, selectField, switchField, textField } from '@upupa/dynamic-form';
import { LanguageService } from '@upupa/language';
import { ActivatedRoute } from '@angular/router';
import { ClientDataSource, DataAdapter, ServerDataSource } from '@upupa/data';
import { DataTableModule } from '@upupa/table';
import { MaterialModulesModule } from '../app-material.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AdminRouterModule } from './admin-routing.module';
import { DashboardPage } from './dashboard/dashboard-page';
import { VideoComponent } from './components/video/video.component';
import { HtmlComponent } from './components/html/html.component';
import { PdfComponent } from './components/pdf/pdf.component';
import { PageContentItemsComponent } from './page-content-items/page-content-items.component';


@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        DataTableModule, DynamicFormModule.forRoot(), AdminRouterModule, MaterialModulesModule
    ],
    providers: [

    ],
    declarations: [DashboardPage, VideoComponent, HtmlComponent, PdfComponent, PageContentItemsComponent],
    exports: []
})
export class AdminModule { }
