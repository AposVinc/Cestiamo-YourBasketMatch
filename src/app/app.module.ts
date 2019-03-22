import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { TranslateModule, TranslateLoader } from '@ngx-translate/core'; //lingua
import { TranslateHttpLoader } from '@ngx-translate/http-loader';//lingua
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { LinguaService } from '../services/lingua.service';
import { IonicStorageModule } from '@ionic/storage';//storage
import { PartitaService } from '../services/partita.service';



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
      loader:{
        provide:TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]
       }
    }), 
    IonicStorageModule.forRoot({
      name: 'cestiamo__db',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
      }),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    LinguaService,
    PartitaService,
  ]
})
export class AppModule {}
