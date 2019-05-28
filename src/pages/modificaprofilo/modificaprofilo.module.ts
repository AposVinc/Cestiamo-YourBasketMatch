import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModificaprofiloPage } from './modificaprofilo';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModificaprofiloPage,
  ],
  imports: [
    IonicPageModule.forChild(ModificaprofiloPage),
    TranslateModule.forChild()
  ],
})
export class ModificaprofiloPageModule {}
