import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartitaPage } from './partita';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PartitaPage,
  ],
  imports: [
    IonicPageModule.forChild(PartitaPage),
    TranslateModule.forChild()
  ],
})
export class PartitaPageModule {}
