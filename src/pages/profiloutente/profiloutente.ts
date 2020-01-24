import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Utente} from "../../model/utente.model";
import {UtenteService} from "../../services/utente.service";
import {GlobalProvider} from "../../providers/global/global";
import {LOGIN_PAGE} from "../pages";
import {DomSanitizer} from "@angular/platform-browser";

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

  utente: Utente;   //utente del quale stiamo viitando il profilo
  votazioneGiaPresente: number = 5;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider, public utenteService: UtenteService,private _DomSanitizationService: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloUtentePage');

    if (this.global.isLogged) {

      this.utenteService.getUtenteByEmail(this.navParams.data.utenteEmail).subscribe((data: Utente) => {
        this.utente = data;
        console.log(this.utente);

        if (this.utente.img.length !==0) {
          this.utente.imgIsSet = true;
        }

        /*
        if (this.utente.img.length ===0) {
          this.utente.img = "../../assets/imgs/avatar.png";
        }
         */
      });

      this.utenteService.getVoto(this.navParams.data.utenteEmail).subscribe((data: number) => {
        this.votazioneGiaPresente = data;
      });

    } else {
      console.log('nessun utente loggato');
      this.navCtrl.push(LOGIN_PAGE);
    }
  }

  Votazione(rating){
    this.utenteService.votaUtente(this.utente, rating.rating).then((data: Utente) => this.utente = data);
  }

}
