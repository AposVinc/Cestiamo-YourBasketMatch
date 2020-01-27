import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BachecapartitaPage} from './bachecapartita';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    BachecapartitaPage,
  ],
  imports: [
    IonicPageModule.forChild(BachecapartitaPage),
    TranslateModule.forChild()
  ],
})
export class BachecapartitaPageModule {
}
