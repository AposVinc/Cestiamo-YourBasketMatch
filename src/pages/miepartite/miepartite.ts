import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';

import {Partita} from "../../model/partita.model";
import {NUOVA_PARTITA_PAGE, PARTITA_PAGE} from "../pages";
import {PartitaService} from "../../services/partita.service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public partitaService: PartitaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListapartitePage');
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
}
