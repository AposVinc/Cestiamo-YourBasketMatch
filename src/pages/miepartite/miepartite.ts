import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';

import {Partita} from "../../model/partita.model";
import {LOGIN_PAGE, NUOVA_PARTITA_PAGE, PARTITA_PAGE} from "../pages";
import {PartitaService} from "../../services/partita.service";
import {Utente} from "../../model/utente.model";
import {GlobalProvider} from "../../providers/global/global";
import {UtenteService} from "../../services/utente.service";

/**
 * Generated class for the MiepartitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-miepartite',
  templateUrl: 'miepartite.html',
})
export class MiepartitePage {
  listaPartite: Array<Partita>;
  utente: Utente;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public partitaService: PartitaService,
              public global: GlobalProvider,
              public utenteService: UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MiePartitePage');
    if (this.global.isLogged) {
      this.utenteService.getUtente().subscribe((utente: Utente) => {
        if (utente != null) {
          this.utente = utente;
          this.partitaService.listMiePartite().subscribe((data: Array<Partita>) => {
            this.listaPartite = data;
          });
        } else {
          console.log('nessun utente loggato');
          this.navCtrl.push(LOGIN_PAGE);
        }
      });
    } else {
      console.log('nessun utente loggato');
      this.navCtrl.push(LOGIN_PAGE)
    }
  }

  openPartita(p: Partita) {
    this.navCtrl.push(PARTITA_PAGE, {partitaId: p.id});
  }

  doRefresh(refresher: Refresher) {
    this.partitaService.listMiePartite().subscribe((data: Array<Partita>) => {
      this.listaPartite = data;
      refresher.complete();
    });
  }

  openNuovaPartita() {
    if (this.global.isLogged) {
      this.navCtrl.push(NUOVA_PARTITA_PAGE);
    } else {
      this.navCtrl.push(LOGIN_PAGE);
    }
  }
}
