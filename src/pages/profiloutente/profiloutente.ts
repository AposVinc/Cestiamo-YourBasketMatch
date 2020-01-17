import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Utente} from "../../model/utente.model";
import {UtenteService} from "../../services/utente.service";
import {GlobalProvider} from "../../providers/global/global";
import {LOGIN_PAGE} from "../pages";

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

  votante: Utente;  //utente loggato all'app
  utente: Utente;   //utente del quale stiamo viitando il profilo

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider, public utenteService: UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloUtentePage');

    if (this.global.isLogged) {
      this.utenteService.getUtente().subscribe((utente: Utente) => {
        if (utente != null) {
          this.votante = utente;

          this.utenteService.getUtenteByEmail(this.navParams.data.utenteEmail).subscribe((data: Utente) => {
            this.utente = data;
          });

        } else {
          console.log('nessun utente loggato');
          this.navCtrl.push(LOGIN_PAGE);
        }
      });
    };
  }


  logRatingChange(rating) {
    console.log("changed rating: ", rating);
  }

  Votazione(rating){
    this.utenteService.votaUtente(this.votante, this.utente, rating.rating); //.then(r => console.log(r) )

  }

}
