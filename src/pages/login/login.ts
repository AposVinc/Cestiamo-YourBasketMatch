import { Component } from '@angular/core';
import { AlertController, Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { LISTA_PARTITE_PAGE, RECUPERA_PASSWORD_PAGE, REGISTRAZIONE_PAGE} from "../pages";
import { Account, UtenteService } from "../../services/utente.service";
import { TranslateService } from "@ngx-translate/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Utente } from "../../model/utente.model";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginTitle: string;
  loginSubTitle: string;
  account: Account = { username:"aaa.aa@aaa.it", password:"123456789" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public events: Events, public translateService: TranslateService, public utenteService: UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.translateService.get('LOGIN_ERROR_SUB_TITLE').subscribe((data) => {
      this.loginSubTitle = data;
    });
    this.translateService.get('LOGIN_ERROR_TITLE').subscribe((data) => {
      this.loginTitle = data;
    });
  }

  openRegistration() {
    this.navCtrl.push(REGISTRAZIONE_PAGE);//deve autenticarmi
  }

  openRecoveryPassword() {
    this.navCtrl.push(RECUPERA_PASSWORD_PAGE);
  }

  login(){
    this.utenteService.login(this.account)
      .subscribe((utente: Utente) => {
          this.events.publish('login', utente);
          this.navCtrl.setRoot(LISTA_PARTITE_PAGE);
        },
        (err: HttpErrorResponse) => {
          if (err.status == 401) {
            console.error('login request error: ' + err.status);
            this.showLoginError();
          }
        });
  }


  showLoginError() {
    let alert = this.alertCtrl.create({
      title: this.loginTitle,
      subTitle: this.loginSubTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
