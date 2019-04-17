import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {EmailComposer} from '@ionic-native/email-composer/ngx';
/**
 * Generated class for the ContattaciPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contattaci',
  templateUrl: 'contattaci.html',
})
export class ContattaciPage {

  subject='';
  body='';
  to='';

  constructor(public navCtrl: NavController, public navParams: NavParams, public emailComposer: EmailComposer,) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContattaciPage');
  }

  send(){
    let email = {
      to: this.to,
      cc: [],
      bcc: [],
      attachments: [],
      subject: this.subject,
      body: this.body,
      isHtml: false,
      app: "Gmail",
    }
    //Send a text message using default options
    this.emailComposer.open(email);
  }

}
