import { NgModule } from '@angular/core';
import { MembershipModule, PageNavigationLink } from '@upupa/membership';
import { DynamicFormModule, FormDesign, hiddenField, selectField, switchField, textField } from '@upupa/dynamic-form';
import { LanguageService, TranslationModule } from '@upupa/language';
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
import { PageContentItemsComponent } from './page-content-items/list/page-content-items.component';
import { CampComponent } from './settings/camp/camp-list/camp.component';
import { CampFormComponent } from './settings/camp/camp-form/camp-form.component';
import { CampPreviewComponent } from './settings/camp/camp-preview/camp-preview.component';
import { DynamicFormMaterialThemeModule, materialThemeComponentMapper } from '@upupa/dynamic-form-material-theme';
import { environment } from 'src/environments/environment';
import { PageContentItemsFormComponent } from './page-content-items/form/page-content-items-form.component';
import { FormsModule } from '@angular/forms';
import { HtmlEditorModule } from '@upupa/html-editor';
import { DepartmentComponent } from './settings/department/department-list/department.component';
import { DepartmentFormComponent } from './settings/department/department-form/department-form.component';
import { DepartmentPreviewComponent } from './settings/department/department-preview/department-preview.component';
import { UploadModule } from '@upupa/upload';
import { SettingsComponent } from './settings/settings/settings-list/settings.component';
import { SettingsFormComponent } from './settings/settings/settings-form/settings-form.component';
import { SettingsPreviewComponent } from './settings/settings/settings-preview/settings-preview.component';
import { ComplaintListComponent } from './complaint/complaint-list/complaint.component';
import { ComplaintPreviewComponent } from './complaint/complaint-preview/complaint-preview.component';


@NgModule({
    imports: [
        IonicModule.forRoot(),
        CommonModule,
        FormsModule,
        TranslationModule,
        DataTableModule, AdminRouterModule, MaterialModulesModule,DynamicFormModule,HtmlEditorModule.register('htmleditor'),        
        UploadModule.forChild(`${environment.server_base_url}/storage`),
    ],
    providers: [

    ],
    declarations: [DashboardPage, VideoComponent, HtmlComponent, PdfComponent, PageContentItemsComponent,PageContentItemsFormComponent,
    CampComponent,CampFormComponent,CampPreviewComponent,DepartmentComponent,DepartmentFormComponent,DepartmentPreviewComponent,
SettingsComponent,SettingsFormComponent,SettingsPreviewComponent,ComplaintListComponent,ComplaintPreviewComponent],
    exports: []
})
export class AdminModule { }
