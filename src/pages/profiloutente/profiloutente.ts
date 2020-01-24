import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Utente} from "../../model/utente.model";
import {UtenteService} from "../../services/utente.service";
import {GlobalProvider} from "../../providers/global/global";
import {LOGIN_PAGE} from "../pages";
import {DomSanitizer} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

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
  voteUserSubTitle: string;
  voteUserTitle: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public global: GlobalProvider,
              public utenteService: UtenteService,
              private _DomSanitizationService: DomSanitizer,
              public alertCtrl: AlertController,
              public translateService: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloUtentePage');

    this.translateService.get('VOTE_USER_TITLE').subscribe((data) => {
      this.voteUserSubTitle = data;
    });
    this.translateService.get('VOTE_USER_SUBTITLE').subscribe((data) => {
      this.voteUserTitle = data;
    });

    if (this.global.isLogged) {

      this.utenteService.getUtente().subscribe((utenteLoggato: Utente) => {
        if (utenteLoggato != null && utenteLoggato.email === this.navParams.data.utenteEmail) {
          if (utenteLoggato.img.length === 0){
            utenteLoggato.img ="../../assets/imgs/avatar.png";
          }
          this.utente = utenteLoggato;

        } else {

          this.utenteService.getUtenteByEmail(this.navParams.data.utenteEmail).subscribe((data: Utente) => {
            if (data.img.length ===0) {
              data.img = "../../assets/imgs/avatar.png";
            }
            this.utente = data;
          });

          this.utenteService.getVoto(this.navParams.data.utenteEmail).subscribe((data: number) => {
            this.votazioneGiaPresente = data;
          });
        }
      });
      
    } else {
      console.log('nessun utente loggato');
      this.navCtrl.push(LOGIN_PAGE);
    }
  }

  Votazione(rating){
    this.utenteService.votaUtente(this.utente, rating.rating).then((data: Utente) => this.utente = data);
    this.registrazioneOk();
  }

  registrazioneOk() {
    let alert = this.alertCtrl.create({
      title: this.voteUserSubTitle,
      subTitle: this.voteUserTitle,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push('ProfiloutentePage');
  }
}
