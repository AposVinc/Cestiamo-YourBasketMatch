import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';//lingua
import {Lingua, LinguaService} from '../services/lingua.service';
import { HttpErrorResponse } from "@angular/common/http";
import {
  LISTA_PARTITE_PAGE,
  MIE_PARTITE_PAGE,
  STORICO_PARTITE_PAGE,
  CONTATTACI_PAGE,
  INFO_APP_PAGE,
  LOGIN_PAGE,
  PROFILO_PERSONALE_PAGE,
} from '../pages/pages';
import {UtenteService} from "../services/utente.service";
import {Utente} from "../model/utente.model";
import {GlobalProvider} from "../providers/global/global";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  utente: Utente;
  image:boolean;
  lingue: Array<Lingua>;
  linguaPreferita: string;

  rootPage: any = LISTA_PARTITE_PAGE;
  pages: Array<{title: string, component: any, menuenab: boolean}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public global: GlobalProvider,
              private translate: TranslateService, public events: Events, private linguaService: LinguaService, public utenteService: UtenteService, private _DomSanitizationService: DomSanitizer) {

    this.initTranslate();
    this.subscribeToEvents();

    // used for an example of ngFor and navigation MENU LATERALE false= back  true = menu
    this.pages = [
      { title: 'LISTA_PARTITE', component: LISTA_PARTITE_PAGE ,menuenab: true },
      { title: 'MIE_PARTITE', component: MIE_PARTITE_PAGE, menuenab: true },
      { title: 'STORICO_PARTITE', component: STORICO_PARTITE_PAGE, menuenab: true },

      { title: 'CONTATTACI', component: CONTATTACI_PAGE ,menuenab: false},
      { title: 'INFO_APP', component: INFO_APP_PAGE, menuenab: false },
    ];

    this.platform.ready().then(() => {
      utenteService.getUtente().subscribe((utente: Utente) => {
        if (utente != null) {
          this.utente = utente;
          if (this.utente.img.length===0){
            this.image=true;
          }
          this.global.isLogged = true;
        } else {
          this.global.isLogged = false;
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  initTranslate() {
    this.lingue = this.linguaService.getLingue();

    // Set the default language for translation strings, and the current language.
    this.linguaPreferita = this.linguaService.getLinguaPreferita();
    console.log(this.linguaPreferita);

    this.translate.setDefaultLang(this.linguaPreferita);
    this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
      if (lingua != null) {
        this.translate.use(lingua);
      } else {
        this.translate.use(this.linguaPreferita);
        this.linguaService.updateLingua(this.linguaPreferita);
      }
    });
  }

  changeLang(){
    console.log(this.linguaPreferita);
    this.translate.use(this.linguaPreferita);
    this.linguaService.updateLingua(this.linguaPreferita);
  }

  subscribeToEvents() {
    this.events.subscribe('login', (utente: Utente) => {
      this.utente = utente;
      this.global.isLogged=true;
    });
    this.events.subscribe('server-error', (err: HttpErrorResponse) => {
      this.showMessageServerError(err);
    });
  }

  showMessageServerError(err: HttpErrorResponse) {
    let errorMessage = "Errore nel server";

    switch (err.status) {
      case 403:
        errorMessage = "Utente non autorizzato";
        break;
      case 401:
        errorMessage = "Utente non autenticato";
        break;
      default:
        errorMessage = `Errore: ${err.status}`;
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  openPage2(page){ // ci fa il back
    this.nav.push(page.component);
  }
  openLoginPage() {
    this.nav.push(LOGIN_PAGE); //per entrare dal menu laterale
  }

  logout() {
    this.utenteService.logout();
  }

  openProfile() {//per entrare nel profilo dal menu laterale
    if (this.global.isLogged){
      this.nav.push(PROFILO_PERSONALE_PAGE);
      console.log('profilo utente', this.utente.nome, this.utente.cognome);
    } else {
      this.nav.push(LOGIN_PAGE);
    }
  }
}
