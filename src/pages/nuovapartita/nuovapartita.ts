import { Component } from '@angular/core';
import {DateTime, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LOGIN_PAGE, MIE_PARTITE_PAGE} from "../pages";
import {LoginPage} from "../login/login";
import {Campo} from "../../model/campo.model";
import {Partita} from "../../model/partita.model";
import {PartitaService} from "../../services/partita.service";
import {NgForm} from "@angular/forms";
import {Tipopartita} from "../../model/tipopartita.model";
import {a} from "@angular/core/src/render3";
import {Utente} from "../../model/utente.model";
import {ListapartitePage} from "../listapartite/listapartite";


/**
 * Generated class for the NuovapartitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuovapartita',
  templateUrl: 'nuovapartita.html',

})
export class NuovapartitaPage {
  listaCampi: Array<Campo>;
  partita: Partita = new Partita();
  listaTipologia: Array<Tipopartita>;
  today = new Date();

  partecipanti: Utente[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public partitaService: PartitaService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuovapartitaPage');
    this.partitaService.listCampi().subscribe((data: Array<Campo>) => {
      this.listaCampi = data;
    });
    this.partitaService.ListTypeMatch().subscribe((data: Array<Tipopartita>) => {
      this.listaTipologia = data;
    });
  }

  openMyMatch() {
    this.navCtrl.setRoot(MIE_PARTITE_PAGE);
  }

  createMatch(partitaForm: NgForm) {
    this.partita.campo = partitaForm.value.campo;
    this.partita.data = partitaForm.value.data;
    this.partita.tipologia = partitaForm.value.tipologia;
   // this.partita.partecipanti.push(this.partita);
    console.log(this.partita);
    this.partitaService.create(this.partita);
    console.log("partita creata correttamente");
    //this.navCtrl.push(ListapartitePage); da vedere
    this.openMyMatch();
  }


}
