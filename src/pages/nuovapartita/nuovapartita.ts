import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


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

  ionViewDidLeave() {
    console.log('ionViewDidLeave NuovapartitaPage');
    //Inserito perche' se l'utente va in un altro tab (es. notizia), e ritorna nel tab esami rimane aperta questa vista
    this.navCtrl.popToRoot();
  }

}

