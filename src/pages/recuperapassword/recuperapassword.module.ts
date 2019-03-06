import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecuperapasswordPage } from './recuperapassword';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RecuperapasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(RecuperapasswordPage),
    TranslateModule.forChild()
  ],
})
export class RecuperapasswordPageModule {}
