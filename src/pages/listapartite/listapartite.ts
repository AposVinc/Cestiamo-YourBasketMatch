import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher } from 'ionic-angular';

import { Partita } from '../../model/partita.model';
import { PartitaService } from '../../services/partita.service';
import {LOGIN_PAGE, NUOVA_PARTITA_PAGE, PARTITA_PAGE} from "../pages";

import { Nav } from 'ionic-angular';
import {GlobalProvider} from "../../providers/global/global";
import {SearchService} from "../../services/search.service";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
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
export class ListapartitePage implements OnInit {

  public searchControl: FormControl;
  public items: any;

  listaPartite: Array<Partita>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public partitaService: PartitaService, public global: GlobalProvider, public  searchService: SearchService) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.setFilteredItems("");

    this.searchControl.valueChanges
      .pipe(debounceTime(700))
      .subscribe(search => {
        this.setFilteredItems(search);
      });
  }

  setFilteredItems(searchTerm) {
    if (searchTerm !== ""){
      this.items = this.searchService.filterItems(searchTerm);
    } else {
      this.items = [];
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPartitePage');
    this.partitaService.list().subscribe((data: Array<Partita>) => {
      this.listaPartite = data;
    });
  }

  getListaPartiteByCampo(campo: Campo){
    this.partitaService.listPartiteByCampo(campo).subscribe(
      (data: Array<Partita>) => {
        this.listaPartite = data;
      });
  }

  openPartita(p: Partita) {
    this.navCtrl.push(PARTITA_PAGE, { partitaId: p.id});
  }

  doRefresh(refresher: Refresher) {
    this.partitaService.list().subscribe((data: Array<Partita>) => {
      this.listaPartite = data;
      refresher.complete();
    });
  }

  openNuovaPartita() {
    if (this.global.isLogged){
      this.navCtrl.push(NUOVA_PARTITA_PAGE);
    } else {
      this.navCtrl.push(LOGIN_PAGE);
    }
  }

}
