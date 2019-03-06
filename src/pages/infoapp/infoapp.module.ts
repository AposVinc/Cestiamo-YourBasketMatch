import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoappPage } from './infoapp';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InfoappPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoappPage),
    TranslateModule.forChild()
  ],
})
export class InfoappPageModule {}
