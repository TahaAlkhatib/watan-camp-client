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

import { LanguageModule, TranslationModule, LanguageService } from '@upupa/language';
import { AuthModule, DEFAULT_SIGNIN, DEFAULT_VERIFY } from '@upupa/auth';
import { ConfirmModule, EventBus, UtilsModule } from '@upupa/common';
import { DataModule } from '@upupa/data';
import { UploadModule } from '@upupa/upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const x = { DEFAULT_SIGNIN };
const signinProvider: Provider = {
    provide: DEFAULT_SIGNIN,
    useFactory: (lang: LanguageService) => `/ar/account/signin`,
    deps: [LanguageService],
};
const verifyProvider: Provider = {
    provide: DEFAULT_VERIFY,
    useFactory: (lang: LanguageService) => `/ar/account/verify`,
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
    AuthModule.forRoot(`${environment.server_base_url}/auth`, null, signinProvider, null, verifyProvider),
    DataModule.forChild(`${environment.server_base_url}/api`),
    LanguageModule.forRoot('en', {}, 'lang', '/assets/langs'),
    TranslationModule,
    UploadModule.forChild(`${environment.server_base_url}/storage`),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent
  ],
  providers: [InAppBrowser],
  bootstrap: [AppComponent]
})
export class AppModule {}
