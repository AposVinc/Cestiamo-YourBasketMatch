import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BACHECA_PARTITA_PAGE, MIE_PARTITE_PAGE} from "../pages";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartitaPage');
  }

  openBacheca() {
    this.navCtrl.setRoot(BACHECA_PARTITA_PAGE);
  }

  leavePartita() {
    this.navCtrl.setRoot(MIE_PARTITE_PAGE);
  }


}
