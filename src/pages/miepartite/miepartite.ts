import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';

import {Partita} from "../../model/partita.model";
import {NUOVA_PARTITA_PAGE} from "../pages";
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

  openPartita(n: Partita) {
    this.navCtrl.push('PatitaPage', { partitaId: n.id }); //this.navCtrl.push(PARTITA_PAGE, p);
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
