import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {Partita} from "../../model/partita.model";
import {PartitaService} from "../../services/partita.service";
import {LOGIN_PAGE, NUOVA_PARTITA_PAGE, PARTITA_PAGE, STORICO_PARTITE_PAGE} from "../pages";
import {UtenteService} from "../../services/utente.service";
import {Utente} from "../../model/utente.model";
import {GlobalProvider} from "../../providers/global/global";

/**
 * Generated class for the StoricopartitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-storicopartite',
  templateUrl: 'storicopartite.html',
})
export class StoricopartitePage {
  partita :Partita;
  utente:Utente;
  listaPartite: Array<Partita>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public partitaService: PartitaService, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoricopartitePage');
    this.partitaService.list().subscribe((data: Array<Partita>) => {
      this.listaPartite = data;
    });
  }

  openPartita(p: Partita) {
    this.navCtrl.push(PARTITA_PAGE, { partitaId: p.id });
  }


  doRefresh(refresher: Refresher) {
    this.partitaService.list().subscribe((data: Array<Partita>) => {
      this.listaPartite = data;
      refresher.complete();
    });
  }

  openNuovaPartita() {
    this.navCtrl.push(NUOVA_PARTITA_PAGE);
  }

  /*listPartiteUser(){
    this.partitaService.matchForUser(this.partita.id, this.utente.email).subscribe(() =>{
      this.navCtrl.push(STORICO_PARTITE_PAGE, {partitaId: this.partita.id});
    })
  }
*/
}
