import {Component, ElementRef, ViewChild} from '@angular/core';
import {Content, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BachecaService} from "../../services/bacheca.service";
import {Partita} from "../../model/partita.model";
import {Messaggio} from "../../model/messaggio.model";
import {Utente} from "../../model/utente.model";
import {PartitaService} from "../../services/partita.service";
import {UtenteService} from "../../services/utente.service";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the BachecapartitaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bachecapartita',
  templateUrl: 'bachecapartita.html',
})
export class BachecapartitaPage {

  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: ElementRef;

  listaMessaggi: Array<Messaggio>;
  utente: Utente = null;
  partita: Partita = null;
  editorMsg = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private  events: Events, private _DomSanitizationService: DomSanitizer,
              private bachecaService: BachecaService, private utenteService: UtenteService, private partitaService: PartitaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BachecapartitaPage');

    this.utenteService.getUtente().subscribe((utente: Utente) => {
      if (utente != null) {
        if (utente.img.length ===0) {
          utente.img = "../../assets/imgs/avatar.png";
        }
        this.utente = utente;
      }
    });

    this.bachecaService.listMessaggi(this.navParams.data.partitaId).subscribe((data: Array<Messaggio>) => {

      data.forEach(function (msg) {
        if (msg.mittente.img.length ===0) {
          msg.mittente.img = "../../assets/imgs/avatar.png";
        }
      });
      this.listaMessaggi = data;

    });

    this.partitaService.findById(this.navParams.data.partitaId).subscribe((data: Partita) => {
      this.partita = data;
    });

    this.events.subscribe("update-img",(img) => {
      this.utente.img = img;
    });
  }


  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }


  sendMsg() {
    if (!this.editorMsg.trim()) return;

    let newMsg: Messaggio = new Messaggio();
    newMsg.mittente = this.utente;
    newMsg.data = new Date();
    newMsg.testo = this.editorMsg;
    newMsg.partita = this.partita;

    this.editorMsg = '';
    this.bachecaService.sendMsg(newMsg).then( (msg:Messaggio) => {
      if (msg.mittente.img.length ===0) {
        msg.mittente.img = "../../assets/imgs/avatar.png";
      }
      this.listaMessaggi.push(msg);
      console.log(this.listaMessaggi);
      this.scrollToBottom();
    });
  }


  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }


}
