import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfiloutentePage } from './profiloutente';
import { TranslateModule } from '@ngx-translate/core';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    ProfiloutentePage,
  ],
    imports: [
        IonicPageModule.forChild(ProfiloutentePage),
        TranslateModule.forChild(),
        StarRatingModule
    ],
})
export class ProfiloutentePageModule {}
