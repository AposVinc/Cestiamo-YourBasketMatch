import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Utente} from "../../model/utente.model";
import {NgForm} from "@angular/forms";
import {UtenteService} from "../../services/utente.service";
import {TranslateService} from "@ngx-translate/core";
import {LoginPage} from "../login/login";

/**
 * Generated class for the RegistrazionePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrazione',
  templateUrl: 'registrazione.html',
})
export class RegistrazionePage {

  utente: Utente = new Utente();
  registrazioneSubTitle: string;
  registrazioneTitle: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utenteService: UtenteService,
              public alertCtrl: AlertController,
              public translateService: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrazionePage');

    this.translateService.get('REGISTRAZIONE_TITLE').subscribe((data) => {
      this.registrazioneSubTitle = data;
    });
    this.translateService.get('RREGISTRAZIONE_SUBTITLE').subscribe((data) => {
      this.registrazioneTitle = data;
    });
  }

  createAccount(loginForm: NgForm) {
    this.utente.nome = loginForm.value.nome;
    this.utente.cognome = loginForm.value.cognome;
    this.utente.dataNascita = loginForm.value.dataNascita;
    this.utente.citta = loginForm.value.citta;
    this.utente.via = loginForm.value.via;
    this.utente.email = loginForm.value.email;
    this.utente.password = loginForm.value.password;
    this.utenteService.create(this.utente);
    console.log(this.utente);
    this.registrazioneOk();
  }

  registrazioneOk() {
    let alert = this.alertCtrl.create({
      title: this.registrazioneSubTitle,
      subTitle: this.registrazioneTitle,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push('LoginPage');
  }

}
