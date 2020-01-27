import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {StoricopartitePage} from './storicopartite';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    StoricopartitePage,
  ],
  imports: [
    IonicPageModule.forChild(StoricopartitePage),
    TranslateModule.forChild()
  ],
})
export class StoricopartitePageModule {
}
