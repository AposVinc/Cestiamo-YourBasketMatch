import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BACHECA_PARTITA_PAGE, MIE_PARTITE_PAGE, PROFILO_UTENTE_PAGE} from "../pages";
import {Partita} from "../../model/partita.model";
import {PartitaService} from "../../services/partita.service";
import {Utente} from "../../model/utente.model";

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
partita: Partita;
partecipanti: Array<Utente>;

constructor(public navCtrl: NavController, public navParams: NavParams, public partitaService:PartitaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartitaPage');
    this.partitaService.findById(this.navParams.data.partitaId).subscribe((data: Partita) => {
      this.partita = data;
      this.partecipanti = data.partecipanti;
    });
  }

  openBacheca() {
    this.navCtrl.push(BACHECA_PARTITA_PAGE);
  }

  openProfilo(utente: Utente) {
    this.navCtrl.push(PROFILO_UTENTE_PAGE, { utenteId: utente.id});
  }

  leavePartita() {
    this.navCtrl.setRoot(MIE_PARTITE_PAGE);
  }


}
