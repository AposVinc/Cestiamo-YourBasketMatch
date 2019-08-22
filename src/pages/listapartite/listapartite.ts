import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';

import { Partita } from '../../model/partita.model';
import { PartitaService } from '../../services/partita.service';
import { NUOVA_PARTITA_PAGE, PARTITA_PAGE} from "../pages";

import { Nav } from 'ionic-angular';
import {Campo} from "../../model/campo.model";


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
  listaCampi: Array<Campo>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public partitaService: PartitaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPartitePage');
    this.partitaService.list().subscribe((data: Array<Partita>) => {
      this.listaPartite = data;
    });
    this.partitaService.listCampi().subscribe((data:Array<Campo>) => {
      this.listaCampi = data;
    });

  }

  openPartita(p: Partita) {
    this.navCtrl.push(PARTITA_PAGE, p);
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

  openPartita2(){
    this.navCtrl.push(PARTITA_PAGE);
  }


}
