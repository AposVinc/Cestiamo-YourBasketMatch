import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MODIFICA_PROFILO_PAGE, PROFILO_PERSONALE_PAGE} from "../pages";
import {Utente} from "../../model/utente.model";
import {UtenteService} from "../../services/utente.service";
import {NgForm} from "@angular/forms";

/**
 * Generated class for the ProfilopersonalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilopersonale',
  templateUrl: 'profilopersonale.html',
})
export class ProfilopersonalePage {

  utente: Utente = new Utente();

  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService:UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloPersonalePage');
    this.utenteService.getUtenteByEmail(this.navParams.data.utenteEmail).subscribe((data: Utente) => {
      this.utente = data;
    });
  }

  saveProfile(profileForm: NgForm){
    console.log("entra metodo salva profilo")
    if(profileForm.valid){
      this.utenteService.updateProfilo(this.utente).subscribe((nuovoUtente: Utente) =>{
        this.utente = nuovoUtente;
        console.log(this.utente);
        console.log("esce, profilo salvato")
      });
    }
  }
}
