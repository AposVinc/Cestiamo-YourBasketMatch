import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
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

  utente: Utente=new Utente();

  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService: UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloUtentePage');
    this.utenteService.getUtenteByEmail(this.navParams.data.utenteEmail).subscribe((data: Utente) => {
      this.utente = data;
      console.log(this.utente);
    });
  }


  logRatingChange(rating) {
    console.log("changed rating: ", rating);
    // do your stuff
    this.utenteService.votaUtente(this.utente).subscribe((utente:Utente) =>{
      this.utente=utente;
    });
  }

}
