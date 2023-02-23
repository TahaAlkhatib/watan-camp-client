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
import { CampComponent } from './settings/camp/camp-list/camp.component';
import { CampFormComponent } from './settings/camp/camp-form/camp-form.component';
import { CampPreviewComponent } from './settings/camp/camp-preview/camp-preview.component';
import { DynamicFormMaterialThemeModule, materialThemeComponentMapper } from '@upupa/dynamic-form-material-theme';
import { environment } from 'src/environments/environment';


@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,

        DataTableModule, AdminRouterModule, MaterialModulesModule,DynamicFormModule
    ],
    providers: [

    ],
    declarations: [DashboardPage, VideoComponent, HtmlComponent, PdfComponent, PageContentItemsComponent,
    CampComponent,CampFormComponent,CampPreviewComponent],
    exports: []
})
export class AdminModule { }
