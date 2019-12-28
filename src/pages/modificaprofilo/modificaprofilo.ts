import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Utente} from "../../model/utente.model";
import {UtenteService} from "../../services/utente.service";

/**
 * Generated class for the ModificaprofiloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modificaprofilo',
  templateUrl: 'modificaprofilo.html',
})
export class ModificaprofiloPage {

  utente: Utente = new Utente();

  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService: UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModificaprofiloPage');
  }

  saveProfile(profileForm: NgForm){
    if(profileForm.valid){
      this.utenteService.updateProfilo(this.utente).subscribe((nuovoUtente: Utente) =>{
        this.utente = nuovoUtente;
      });
    }
  }
  

}
