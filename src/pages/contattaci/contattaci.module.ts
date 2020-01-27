import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ContattaciPage} from './contattaci';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    ContattaciPage,
  ],
  imports: [
    IonicPageModule.forChild(ContattaciPage),
    TranslateModule.forChild()
  ],
})
export class ContattaciPageModule {
}
