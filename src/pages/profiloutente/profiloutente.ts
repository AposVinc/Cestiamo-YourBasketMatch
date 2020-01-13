import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Utente} from "../../model/utente.model";
import {UtenteService} from "../../services/utente.service";
import {Partita} from "../../model/partita.model";

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
  utente: Utente=new Utente();

  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService: UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloutentePage');
    console.log('1');
    this.utenteService.getUtenteByEmail(this.navParams.data.utenteEmail).subscribe((data: Utente) => {
      this.utente = data;
      console.log(this.utente);
      console.log('2');
    });

  }

  logRatingChange(rating) {
    console.log("changed rating: ", rating);
    // do your stuff
  }

}

