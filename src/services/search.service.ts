import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Campo} from "../model/campo.model";
import {PartitaService} from "./partita.service";

/*
  Generated class for the ServicesDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchService {
  public listaCampi: Campo[] = [];

  constructor(public http: HttpClient, public partitaService: PartitaService) {
    console.log('Hello ServicesDataProvider Provider');

    this.partitaService.listCampi().subscribe((data: Array<Campo>) => {
      this.listaCampi = data;
    });
  }

  filterItems(searchTerm) {
    return this.listaCampi.filter(campo => {
      return campo.citta.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
