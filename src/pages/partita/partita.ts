import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BACHECA_PARTITA_PAGE, LISTA_PARTITE_PAGE, LOGIN_PAGE, PROFILO_UTENTE_PAGE} from "../pages";
import {Partita} from "../../model/partita.model";
import {PartitaService} from "../../services/partita.service";
import {Utente} from "../../model/utente.model";
import {UtenteService} from "../../services/utente.service";
import {GlobalProvider} from "../../providers/global/global";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the PartitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partita',
  templateUrl: 'partita.html',
})
export class PartitaPage {
  utente: Utente;
  partita: Partita;
  partecipanti: Utente[];
  isPartecipant: boolean = false;
  soldOut: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public global: GlobalProvider, private _DomSanitizationService: DomSanitizer,
              public partitaService:PartitaService, public utenteService: UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartitaPage');
    if (this.global.isLogged) {
      this.setUtenteLoggato();
    };
    this.setDatiPartita();
  }

  setUtenteLoggato(){
    this.utenteService.getUtente().subscribe((utente: Utente) => {
      if (utente != null) {
        this.utente = utente;
      } else {
        console.log('nessun utente loggato');
      }
    });
  }

  setDatiPartita(){
    this.partitaService.findById(this.navParams.data.partitaId).subscribe((data: Partita) => {
      this.partita = data;
      this.partecipanti = data.partecipanti;

      this.setImmaginiDefault();

      if (this.utente != null && this.global.isLogged) {  //utente loggato
        this.partitaService.checkIfUtenteLoggatoPartecipate(this.navParams.data.partitaId).subscribe( (bool :boolean) => {
          console.log("partecipa " + bool);
          if (bool){
            this.isPartecipant = true;
            if (this.utente.img.length ===0) {
              this.utente.img = "../../assets/imgs/avatar.png";
            }
          }
        });
      }

      //ho controllato tutti i partecipanti e l'utente non ne fa parte
      if (this.partita.personeMancanti !== 0){
        this.soldOut = false;    //ci sono posti
      } else {
        this.soldOut = true;    //l'utente non puo partecipare perche non ci sono i posti
        console.log('sold out');
      }

    });
  }

  setImmaginiDefault(){
    //se non è settato, mostra img di default
    this.partecipanti.forEach(function (utente) {
      if (utente.img.length ===0) {
        utente.img = "../../assets/imgs/avatar.png";
      }
    });

  }

  openBacheca() {
    this.navCtrl.push(BACHECA_PARTITA_PAGE, {partitaId: this.partita.id});
  }

  openProfilo(utente: Utente) {
    if (this.global.isLogged) {
      this.navCtrl.push(PROFILO_UTENTE_PAGE, { utenteEmail: utente.email});
    } else {
      console.log('nessun utente loggato');
      this.navCtrl.push(LOGIN_PAGE);
    }
  }

  openLogin(){
    this.navCtrl.push(LOGIN_PAGE);
    //iscriviti a evento e controlla se puo partecipare
  }

  leavePartita() {
    this.partitaService.removeUtente(this.partita.id).subscribe(() => {
      this.navCtrl.setRoot(LISTA_PARTITE_PAGE);
    });
  }

  joinPartita() {
    if (this.global.isLogged){
      this.partitaService.addUtente(this.partita.id).subscribe( () => {
        this.partecipanti.push(this.utente);
        this.isPartecipant = true;
      });
    } else {
      this.navCtrl.push(LOGIN_PAGE);
    }

  }

  logRatingChange(rating){
    console.log("changed rating: ",rating);
    // do your stuff
  }

}
