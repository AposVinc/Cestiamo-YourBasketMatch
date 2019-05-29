import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { URL } from '../constants';
import { Partita } from '../model/partita.model';

@Injectable()
export class PartitaService {

    constructor(private http: HttpClient) {
    }

    list(): Observable<Array<Partita>> {
        return this.http.get<Array<Partita>>(URL.LISTA_PARTITE);
    }

    findById(partitaId: number): Observable<Partita> {
        let apiURL = `${URL.PARTITA}/${partitaId}`;
        return this.http.get<Partita>(apiURL);
    }
}

