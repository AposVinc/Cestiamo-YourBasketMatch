import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuovapartitaPage } from './nuovapartita';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    NuovapartitaPage,
  ],
  imports: [
    IonicPageModule.forChild(NuovapartitaPage),
    TranslateModule.forChild()
  ],
})
export class NuovapartitaPageModule {}
