import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BACHECA_PARTITA_PAGE, MIE_PARTITE_PAGE} from "../pages";
import {Partita} from "../../model/partita.model";
import {PartitaService} from "../../services/partita.service";

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
partita1:Partita;

constructor(public navCtrl: NavController, public navParams: NavParams, public partitaService:PartitaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartitaPage');
    // @ts-ignore       findById(this.navParams.data.partitaId)        findById("1")
    this.partitaService.findById(1).subscribe((data: Partita) => {
      this.partita1 = data;
    });
  }



  openBacheca() {
    this.navCtrl.setRoot(BACHECA_PARTITA_PAGE);
  }

  leavePartita() {
    this.navCtrl.setRoot(MIE_PARTITE_PAGE);
  }


}
