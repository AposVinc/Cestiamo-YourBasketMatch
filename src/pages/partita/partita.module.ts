import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartitaPage } from './partita';
import { TranslateModule } from '@ngx-translate/core';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    PartitaPage,
  ],
    imports: [
        IonicPageModule.forChild(PartitaPage),
        TranslateModule.forChild(),
        StarRatingModule
    ],
})
export class PartitaPageModule {}
