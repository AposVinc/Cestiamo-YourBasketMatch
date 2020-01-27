import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {MiepartitePage} from './miepartite';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    MiepartitePage,
  ],
  imports: [
    IonicPageModule.forChild(MiepartitePage),
    TranslateModule.forChild()
  ],
})
export class MiepartitePageModule {
}
