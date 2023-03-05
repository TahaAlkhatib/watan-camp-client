import { HttpClientModule } from '@angular/common/http';
import { NgModule,Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DynamicDialogComponent } from './dialogs/dynamic-dialog/dynamic-dialog.component';

import { LanguageModule, TranslationModule, LanguageService } from '@upupa/language';
import { AuthModule, DEFAULT_LOGIN, DEFAULT_VERIFY } from '@upupa/auth';
import { ConfirmModule, EventBus, UtilsModule } from '@upupa/common';
import { DataModule } from '@upupa/data';
import { UploadModule } from '@upupa/upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YoutubePipe } from './pipes/youtube.pipe';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import { DynamicFormModule } from '@upupa/dynamic-form';
import { DynamicFormMaterialThemeModule, materialThemeComponentMapper } from '@upupa/dynamic-form-material-theme';
import { ChooseLanuageComponent } from './choose-lanuage/choose-lanuage.component';
import { ChooseCampComponent } from './choose-camp/choose-camp.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CampNameService } from './camp-name.service';
import { NotificationService } from './notification.service';

const lang = localStorage.getItem('language')
const signinProvider: Provider = {
    provide: DEFAULT_LOGIN,
    useFactory: (lang: LanguageService) => `/${lang?? 'en'}/account/signin`,
    deps: [LanguageService],
};
const verifyProvider: Provider = {
    provide: DEFAULT_VERIFY,
    useFactory: (lang: LanguageService) => `/${lang?? 'en'}/account/verify`,
    deps: [LanguageService],
};

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    UtilsModule,
    ConfirmModule,
    AuthModule.forRoot(`${environment.server_base_url}/auth`,{ default_login_url:signinProvider,default_verify_url:verifyProvider}),
    DataModule.forChild(`${environment.server_base_url}/api`),
    LanguageModule.forRoot(lang?? 'en', {}, 'lang', '/assets/langs'),
    TranslationModule,
    UploadModule.forChild(`${environment.server_base_url}/storage`),
    BrowserAnimationsModule,
    PdfViewerModule,
    DynamicFormModule.forRoot([],{'material':materialThemeComponentMapper},'material',{enableLogs:!environment.production}),DynamicFormMaterialThemeModule
  ],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DynamicDialogComponent,
    YoutubePipe,
    AdminLayoutComponent,
    TabBarComponent,
    ChooseLanuageComponent,
    ChooseCampComponent
  ],
  providers: [InAppBrowser,CampNameService,NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
