import './shared/rxjs-operators';

import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {httpInterceptorProviders} from '../interceptors';

import {MyApp} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {File} from '@ionic-native/file/ngx';
import {FileTransfer} from '@ionic-native/file-transfer';
import {FilePath} from '@ionic-native/file-path/ngx';
import {Camera} from '@ionic-native/camera';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core'; //lingua
import {TranslateHttpLoader} from '@ngx-translate/http-loader';//lingua
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';  //storage

import {LinguaService} from '../services/lingua.service';
import {PartitaService} from '../services/partita.service';
import {UtenteService} from "../services/utente.service";
import {BachecaService} from "../services/bacheca.service";

import {GlobalProvider} from '../providers/global/global';
import {ReactiveFormsModule} from "@angular/forms";


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({  //lingua
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: 'cestiamo__db',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp),

    ReactiveFormsModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    httpInterceptorProviders,

    LinguaService,
    PartitaService,
    UtenteService,
    GlobalProvider,
    BachecaService,

    Camera,
    FilePath,
    FileTransfer,
    File,
  ]
})
export class AppModule {
}
