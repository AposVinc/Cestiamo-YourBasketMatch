import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import {Partita} from "../../model/partita.model";
import {PartitaService} from "../../services/partita.service";
import {LOGIN_PAGE, NUOVA_PARTITA_PAGE, PARTITA_PAGE} from "../pages";
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

  utente: Utente;
  listaPartite: Array<Partita>;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public partitaService: PartitaService,
              public global: GlobalProvider,
              public utenteService: UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoricopartitePage');
    if (this.global.isLogged) {
      this.utenteService.getUtente().subscribe((utente: Utente) => {
        if (utente != null) {
          this.utente = utente;

          this.partitaService.listMiePartiteGiocate().subscribe((data: Array<Partita>) => {
            this.listaPartite = data;
          });
        } else {
          console.log('nessun utente loggato');
          this.navCtrl.push(LOGIN_PAGE);
        }
      });
    } else {
      this.navCtrl.push(LOGIN_PAGE);
    }
  }

  openPartita(p: Partita) {
    this.navCtrl.push(PARTITA_PAGE, {partitaId: p.id});
  }


  doRefresh(refresher: Refresher) {
    this.partitaService.listMiePartiteGiocate().subscribe((data: Array<Partita>) => {
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
