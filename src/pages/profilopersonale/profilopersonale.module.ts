import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ProfilopersonalePage} from './profilopersonale';
import {TranslateModule} from '@ngx-translate/core';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    ProfilopersonalePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilopersonalePage),
    TranslateModule.forChild(),
    StarRatingModule
  ],
})
export class ProfilopersonalePageModule {
}
