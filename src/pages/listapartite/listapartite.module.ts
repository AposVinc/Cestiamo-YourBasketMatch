import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ListapartitePage} from './listapartite';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListapartitePage,
  ],
  imports: [
    IonicPageModule.forChild(ListapartitePage),
    TranslateModule.forChild()
  ],
})
export class ListapartitePageModule {
}
