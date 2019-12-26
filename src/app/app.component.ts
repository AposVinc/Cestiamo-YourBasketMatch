import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';//lingua
import { LinguaService } from '../services/lingua.service';
import { HttpErrorResponse } from "@angular/common/http";
//import { ListapartitePage } from '../pages/listapartite/listapartite';
import {
  LISTA_PARTITE_PAGE,
  MIE_PARTITE_PAGE,
  STORICO_PARTITE_PAGE,
  CONTATTACI_PAGE,
  INFO_APP_PAGE,
  NUOVA_PARTITA_PAGE,
  LOGIN_PAGE,
  PROFILO_PERSONALE_PAGE,
  BACHECA_PARTITA_PAGE,
} from '../pages/pages';
import {UtenteService} from "../services/utente.service";
import {Utente} from "../model/utente.model";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  utente: Utente;
  isLogged: boolean = false;

  rootPage: any = LISTA_PARTITE_PAGE;
  pages: Array<{title: string, component: any, menuenab: boolean}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private translate: TranslateService, public events: Events, private linguaService: LinguaService, public utenteService: UtenteService) {

    this.initTranslate();
    this.subscribeToEvents();

    // used for an example of ngFor and navigation MENU LATERALE false= back  true = menu
    this.pages = [
      { title: 'LISTA_PARTITE', component: LISTA_PARTITE_PAGE ,menuenab: true },
      { title: 'MIE_PARTITE', component: MIE_PARTITE_PAGE, menuenab: true },
      { title: 'STORICO_PARTITE', component: STORICO_PARTITE_PAGE, menuenab: true },

      { title: 'CONTATTACI', component: CONTATTACI_PAGE ,menuenab: false},
      { title: 'INFO_APP', component: INFO_APP_PAGE, menuenab: false },
      { title: 'NUOVA_PARTITA', component: NUOVA_PARTITA_PAGE, menuenab: false },
      { title: 'BACHECA_PARTITA', component: BACHECA_PARTITA_PAGE, menuenab: true },
    ];


    this.platform.ready().then(() => {
      utenteService.getUtente().subscribe((utente: Utente) => {
        if (utente != null) {
          this.utente = utente;
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  initTranslate() {
    /*  // Set the default language for translation strings, and the current language.
      let linguaPreferita = this.linguaService.getLinguaPreferita();
      this.translate.setDefaultLang(linguaPreferita);
      this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
        if (lingua != null) {
          this.translate.use(lingua);
        } else {
          this.translate.use(linguaPreferita);
          this.linguaService.updateLingua(linguaPreferita);
        }
      });*/
    this.translate.setDefaultLang('it');
    this.translate.use('it');


    //Bisognerebbe settarlo anche quando si cambia la lingua
    /*
    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
    */
  }

  subscribeToEvents() {
    this.events.subscribe('login', (utente: Utente) => {
      this.utente = utente;
      this.isLogged=true;
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
    this.isLogged = false;
  }

  openProfile() {//per entrare nel profilo dal menu laterale
    this.nav.push(PROFILO_PERSONALE_PAGE, { utenteEmail: this.utente.email});
    console.log('profilo utente', this.utente.nome, this.utente.cognome)
  }
}
