import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LOGIN_PAGE} from "../pages";
import {Utente} from "../../model/utente.model";
import {NgForm} from "@angular/forms";
import {UtenteService} from "../../services/utente.service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService: UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrazionePage');
  }

 /* createAccount( registrazioneForm : NgForm) {
    console.log("entra metodo creaUtente")
      if(registrazioneForm.valid){
        this.utenteService.create(this.utente).subscribe((nuovoUtente: Utente) => {
          this.utente = nuovoUtente;
          console.log(this.utente);
          console.log("esce, profilo salvato")
        });
      this.navCtrl.setRoot(LOGIN_PAGE);
    }
  }*/
}
