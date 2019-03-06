import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilopersonalePage } from './profilopersonale';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProfilopersonalePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilopersonalePage),
    TranslateModule.forChild()
  ],
})
export class ProfilopersonalePageModule {}
