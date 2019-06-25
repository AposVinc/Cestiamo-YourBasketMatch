import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LOGIN_PAGE, MIE_PARTITE_PAGE} from "../pages";
import {LoginPage} from "../login/login";
import {Campo} from "../../model/campo.model";
import {Partita} from "../../model/partita.model";
import {PartitaService} from "../../services/partita.service";
import {NgForm} from "@angular/forms";


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
  today = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,public partitaService: PartitaService,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuovapartitaPage');
    this.partitaService.listCampi().subscribe((data: Array<Campo>) => {
      this.listaCampi = data;
    });
  }


  openMyMatch() {
    this.navCtrl.setRoot(MIE_PARTITE_PAGE);
  }

  createMatch(partitaForm: NgForm){
    this.partita.campo = partitaForm.value.campo;
    this.partita.data = partitaForm.value.data;
    this.partita.orario = partitaForm.value.orario;
    this.partita.tipologia = partitaForm.value.tipologia;

    this.partitaService.create(this.partita);
    this.openMyMatch();
  }


}

