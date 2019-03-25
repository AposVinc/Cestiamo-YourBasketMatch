import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MIE_PARTITE_PAGE} from "../pages";


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
  
  constructor(public navCtrl: NavController, public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuovapartitaPage');
  }


  openMyMatch() {
    //this.navCtrl.setRoot(MIE_PARTITE_PAGE);
    this.navCtrl.setRoot(MIE_PARTITE_PAGE);
  }

}

