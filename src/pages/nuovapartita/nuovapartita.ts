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



  /*customActionSheetOptions: any = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuovapartitaPage');
  }

}

