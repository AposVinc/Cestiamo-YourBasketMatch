import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';

import {Partita} from '../../model/partita.model';
import {PartitaService} from '../../services/partita.service';
import {LOGIN_PAGE, NUOVA_PARTITA_PAGE, PARTITA_PAGE} from "../pages";

import {GlobalProvider} from "../../providers/global/global";


/**
 * Generated class for the ListapartitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listapartite',
  templateUrl: 'listapartite.html',
})
export class ListapartitePage {

  listaPartite: Array<Partita>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public partitaService: PartitaService,
              public global: GlobalProvider) {
    this.subscribeToEvents();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPartitePage');
    this.partitaService.list().subscribe((data: Array<Partita>) => {
      this.listaPartite = data;
    });
  }

  openPartita(p: Partita) {
    this.navCtrl.push(PARTITA_PAGE, {partitaId: p.id});
  }

  doRefresh(refresher: Refresher) {
    this.partitaService.list().subscribe((data: Array<Partita>) => {
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

  subscribeToEvents() {
    this.events.subscribe("citta-selected", (campo) => {
      this.partitaService.listPartiteByCampo(campo).subscribe((data: Array<Partita>) => {
        this.listaPartite = data;
      });
    });

    this.events.subscribe("tipologia-selected", (tipopartita) => {
      this.partitaService.listPartiteByTipologia(tipopartita).subscribe((data: Array<Partita>) => {
        this.listaPartite = data;
      });
    });

    this.events.subscribe("data-selected", (data) => {
      this.partitaService.listPartiteByData(data).subscribe((data: Array<Partita>) => {
        this.listaPartite = data;
      });
    });
  }

}
