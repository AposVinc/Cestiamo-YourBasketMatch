import {Component} from '@angular/core';
import {ActionSheetController, AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Utente} from "../../model/utente.model";
import {UtenteService} from "../../services/utente.service";
import {NgForm} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {TranslateService} from "@ngx-translate/core";

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
  saveUserSubTitle: string;
  saveUserTitle: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utenteService: UtenteService,
              private _DomSanitizationService: DomSanitizer,
              public actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              public translateService: TranslateService,
              public alertCtrl: AlertController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloPersonalePage');

    this.translateService.get('SAVE_USER_TITLE').subscribe((data) => {
      this.saveUserSubTitle = data;
    });
    this.translateService.get('SAVE_USER_SUBTITLE').subscribe((data) => {
      this.saveUserTitle = data;
    });

    this.utenteService.getUtente().subscribe((user) => {
      this.utente = user;
      if (this.utente.img.length ===0) {
        this.utente.img = "../../assets/imgs/avatar.png";
      }
    });
  }

  saveProfile(profileForm: NgForm) {
    if (profileForm.valid) {
      delete this.utente.img;
      this.utenteService.updateProfilo(this.utente).subscribe((nuovoUtente: Utente) => {
        this.utente = nuovoUtente;
        this.registrazioneOk();
      });
    }
  }
  registrazioneOk() {
    let alert = this.alertCtrl.create({
      title: this.saveUserSubTitle,
      subTitle: this.saveUserTitle,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push('ProfilopersonalePage');
  }

  changePhoto() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    var options: CameraOptions = {
      quality: 100,
      targetWidth: 200,
      targetHeight: 150,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageURI) => {
      let base64Image = "data:image/jpeg;base64,"+ imageURI;
      this.utenteService.updateImage(base64Image);
      this.utente.img = base64Image;
    }, (err) => {
      console.log(err)
    });
  }
}
