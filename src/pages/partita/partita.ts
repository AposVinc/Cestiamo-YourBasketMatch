import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BACHECA_PARTITA_PAGE, LISTA_PARTITE_PAGE, LOGIN_PAGE, MIE_PARTITE_PAGE, PROFILO_UTENTE_PAGE} from "../pages";
import {Partita} from "../../model/partita.model";
import {PartitaService} from "../../services/partita.service";
import {Utente} from "../../model/utente.model";
import {LinguaService} from "../../services/lingua.service";
import {UtenteService} from "../../services/utente.service";
import {GlobalProvider} from "../../providers/global/global";

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
  canJoin: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider, public partitaService:PartitaService, public utenteService: UtenteService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartitaPage');

    this.utenteService.getUtente().subscribe((utente: Utente) => {
      if (utente != null) {
        this.utente = utente;
        console.log('utente loggato');
      } else {
        console.log('nessun utente loggato');
      }
    });

    this.partitaService.findById(this.navParams.data.partitaId).subscribe((data: Partita) => {
      this.partita = data;
      this.partecipanti = data.partecipanti;

      if (this.utente != null && this.global.isLogged) {
        for (let i = 0; i < this.partecipanti.length; i++) {
          if (this.partecipanti[i].email === this.utente.email) {
            console.log('true');
            this.canJoin = true;
            break;
          } else {
            console.log('false');
            this.canJoin = false;
          }
        }
      } else {
        this.canJoin = false;
      }
    });

  }

  openBacheca() {
    this.navCtrl.push(BACHECA_PARTITA_PAGE);
  }

  openProfilo(utente: Utente) {
    this.navCtrl.push(PROFILO_UTENTE_PAGE, { utenteEmail: utente.email});
  }

  leavePartita() {
    //logica
    this.navCtrl.setRoot(LISTA_PARTITE_PAGE);
  }

  joinPartita() {
    if (this.global.isLogged){
      console.log('partecipa');
    } else {
      console.log('non logato');

      this.navCtrl.push(LOGIN_PAGE);
    }

  }

  logRatingChange(rating){
    console.log("changed rating: ",rating);
    // do your stuff
  }

  //mostra i voti medi di ogni utente
  //op di leave, op partecipa
}
