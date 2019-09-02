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
  partita :Partita = new Partita();
  listaTipologia : Array<Tipopartita>;
  today = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,public partitaService: PartitaService,) {
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

  createMatch(partitaForm: NgForm){
    this.partita.campo = partitaForm.value.campo;
    this.partita.data = new Date(partitaForm.value.data.year, partitaForm.value.data.month, partitaForm.value.data.day, partitaForm.value.orario.hour, partitaForm.value.orario.minute);
    this.partita.tipologia = partitaForm.value.tipologia;

    this.partitaService.create(this.partita);
    this.openMyMatch();
  }

}

