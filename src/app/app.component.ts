import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, Events, NavParams, MenuController} from 'ionic-angular';
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
import {Campo} from "../model/campo.model";
import {debounceTime} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {PartitaService} from "../services/partita.service";
import {Tipopartita} from "../model/tipopartita.model";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  utente: Utente;
  lingue: Array<Lingua>;
  linguaPreferita: string;

  rootPage: any = LISTA_PARTITE_PAGE;
  pages: Array<{title: string, component: any, menuenab: boolean}>;

  today = new Date();
  listaCampi: Array<Campo>;
  listaTipologia: Array<Tipopartita>;

  dataSelected: Date;
  tipologiaSelected: Tipopartita;

  public searchControl: FormControl;
  public items: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, public global: GlobalProvider,
              private translate: TranslateService, public events: Events, private linguaService: LinguaService, public utenteService: UtenteService,
              private _DomSanitizationService: DomSanitizer, public partitaService: PartitaService) {

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
          if (utente.img.length ===0) {
            utente.img = "../../assets/imgs/avatar.png";
          }
          this.utente = utente;
          this.global.isLogged = true;
        } else {
          this.global.isLogged = false;
        }
      });
      statusBar.styleDefault();
      splashScreen.hide();
    });


    this.partitaService.listCampi().subscribe((data: Array<Campo>) => {
      this.listaCampi = data;
    });
    this.partitaService.ListTypeMatch().subscribe((data: Array<Tipopartita>) => {
      this.listaTipologia = data;
    });


    this.searchControl = new FormControl();

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
      if (utente.img.length ===0) {
        utente.img = "../../assets/imgs/avatar.png";
      }
      this.utente = utente;
      this.global.isLogged=true;
    });
    this.events.subscribe('server-error', (err: HttpErrorResponse) => {
      this.showMessageServerError(err);
    });
    this.events.subscribe("update-img",(img) => {
      this.utente.img = img;
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




  ngOnInit() {
    this.setFilteredItems("");

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.setFilteredItems(search);
      });
  }

  setFilteredItems(searchTerm) {
    if (searchTerm !== ""){
      this.items = this.filterItems(searchTerm);
    } else {
      this.items = [];
    }
  }

  filterItems(searchTerm) {
    return this.listaCampi.filter(campo => {
      return campo.citta.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }


  getListaPartiteByCampo(campo: Campo){
    this.events.publish('citta-selected', campo);
    this.menuCtrl.close("filter");
    this.setFilteredItems("");
  }

  getListaPartiteByTip() {
    this.events.publish('tipologia-selected', this.tipologiaSelected);
    this.menuCtrl.close("filter");
    this.tipologiaSelected = null;
  }

  getListaPartitaByData(){
    this.events.publish('data-selected', this.dataSelected);
    this.menuCtrl.close("filter");
    this.dataSelected = null;
  }


}
