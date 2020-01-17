import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {LOGIN_PAGE, MIE_PARTITE_PAGE} from "../pages";
import {Campo} from "../../model/campo.model";
import {Partita} from "../../model/partita.model";
import {PartitaService} from "../../services/partita.service";
import {NgForm} from "@angular/forms";
import {Tipopartita} from "../../model/tipopartita.model";
import {Utente} from "../../model/utente.model";
import {GlobalProvider} from "../../providers/global/global";
import {UtenteService} from "../../services/utente.service";


/**
 * Generated class for the NuovapartitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuovapartita',
  templateUrl: 'nuovapartita.html',

})
export class NuovapartitaPage {
  utente: Utente = null;

  listaCampi: Array<Campo>;
  partita: Partita = new Partita();
  listaTipologia: Array<Tipopartita>;
  today = new Date();

  data: Date;
  orario: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, public global: GlobalProvider,
              public partitaService: PartitaService, public utenteService: UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuovapartitaPage');

    if (this.global.isLogged) {
      this.utenteService.getUtente().subscribe((utente: Utente) => {
        if (utente != null) {
          this.utente = utente;
        } else {
          console.log('nessun utente loggato');
        }
      });
    } else {
      this.navCtrl.push(LOGIN_PAGE);
    }

    this.partitaService.listCampi().subscribe((data: Array<Campo>) => {
      this.listaCampi = data;
    });
    this.partitaService.ListTypeMatch().subscribe((data: Array<Tipopartita>) => {
      this.listaTipologia = data;
    });
  }

  openMiePartite() {
    this.navCtrl.setRoot(MIE_PARTITE_PAGE);
  }

  createMatch(partitaForm: NgForm) {
    var d = this.data.toString().split("-");
    var o = this.orario.toString().split(":");
    this.partita.data = new Date(Number(d[0]), Number(d[1]), Number(d[2]), Number(o[0]) ,Number(o[1]));
    this.partitaService.create(this.partita, this.utente);
    this.openMiePartite();
  }

}
