import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';

import { Partita } from '../../model/partita.model';
import { PartitaService } from '../../services/partita.service';
import { NUOVA_PARTITA_PAGE, PARTITA_PAGE} from "../pages";

import { Nav } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public partitaService: PartitaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPartitePage');
    this.partitaService.list().subscribe((data: Array<Partita>) => {
      this.listaPartite = data;
    });
  }

  openPartita(p: Partita) {
    this.navCtrl.push('PartitaPage', { partitaId: p.id});
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
