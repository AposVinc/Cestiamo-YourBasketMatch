import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BACHECA_PARTITA_PAGE, MIE_PARTITE_PAGE, PROFILO_UTENTE_PAGE} from "../pages";
import {Partita} from "../../model/partita.model";
import {PartitaService} from "../../services/partita.service";
import {Utente} from "../../model/utente.model";
import {LinguaService} from "../../services/lingua.service";
import {UtenteService} from "../../services/utente.service";

/**
 * Generated class for the PartitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-partita',
  templateUrl: 'partita.html',
})
export class PartitaPage {
  utente: Utente;
  partita: Partita;
  partecipanti: Utente[];
  loggedUserIsPartecipant: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public partitaService:PartitaService, public utenteService: UtenteService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartitaPage');

    this.utenteService.getUtente().subscribe((utente: Utente) => {
      if (utente != null) {
        this.utente = utente;
        console.log(this.utente);
      } else {
        console.log('nessun utente loggato');
      }
    });

    this.partitaService.findById(this.navParams.data.partitaId).subscribe((data: Partita) => {
      this.partita = data;
      this.partecipanti = data.partecipanti;

      if (this.utente != null) {
        for (let i = 0; i < this.partecipanti.length; i++) {
          if (this.partecipanti[i].id === this.utente.id) {
            this.loggedUserIsPartecipant = true;
            break;
          } else {
            this.loggedUserIsPartecipant = false;
          }
        }
      } else {
        this.loggedUserIsPartecipant = false;
      }
    });



    /*
        this.utenteService.getUtente().subscribe((utente: Utente) => {
          if (utente != null) {
            for(var i=0 ; i < (this.partecipanti).length ; i++){
              if (this.partecipanti[i].id === utente.id){
                this.loggedUserIsPartecipant = true;
                break;
              } else {
                this.loggedUserIsPartecipant = false;
              }
            }
          } else {
            this.loggedUserIsPartecipant = false;
          }
        });
     */
    /*
        this.utenteService.getUtente().subscribe((utente: Utente) => {
          if (utente != null) {
            this.utente = utente;
            console.log('utente')
            //console.log(this.partecipanti);
          } else {
            console.log('a');
          }
          for (let i=0; i<this.partecipanti.length; i++){
            if (this.partecipanti[i].id === this.utente.id){
              this.loggedUserIsPartecipant = true;
              console.log('true');
              break;
            } else {
              console.log('false');
              this.loggedUserIsPartecipant = false;
            }
          }
        });

     */
  }

  openBacheca() {
    this.navCtrl.push(BACHECA_PARTITA_PAGE);
  }

  openProfilo(utente: Utente) {
    this.navCtrl.push(PROFILO_UTENTE_PAGE, { utenteId: utente.id});
  }

  leavePartita() {
    this.navCtrl.setRoot(MIE_PARTITE_PAGE);
  }

  joinPartita() {
    console.log('partecipa');
  }

  logRatingChange(rating){
    console.log("changed rating: ",rating);
    // do your stuff
  }

  //mostra i voti medi di ogni utente
  //op di leave, op partecipa
}
