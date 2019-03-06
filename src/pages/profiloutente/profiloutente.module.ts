import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfiloutentePage } from './profiloutente';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProfiloutentePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfiloutentePage),
    TranslateModule.forChild()
  ],
})
export class ProfiloutentePageModule {}
