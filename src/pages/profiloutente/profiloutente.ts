import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Utente} from "../../model/utente.model";
import {UtenteService} from "../../services/utente.service";

/**
 * Generated class for the ProfiloutentePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profiloutente',
  templateUrl: 'profiloutente.html',
})
export class ProfiloutentePage {
utente: Utente;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService:UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloutentePage');
    this.utenteService.getUtenteById(this.navParams.data.utenteId).subscribe((data: Utente) => {
      this.utente = data;
    });
  }

}
