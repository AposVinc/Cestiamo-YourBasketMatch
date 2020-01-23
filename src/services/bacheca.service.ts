import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {URL} from "../constants";
import {Messaggio} from "../model/messaggio.model";


@Injectable()
export class BachecaService {

  constructor(private http: HttpClient,
              private events: Events) {
  }

  listMessaggi(partitaId: number): Observable<Array<Messaggio>>{
    let apiURL = `${URL.BACHECA}/${partitaId}`;
    return this.http.get<Array<Messaggio>> (apiURL);
  }

  sendMsg(msg: Messaggio) {
    return this.http.post<Messaggio>(`${URL.BACHECA}/${msg.partita.id}/addMessaggio`, msg).toPromise()
      .then((response: Messaggio) => {
        return response;
      }).catch(error => { console.error() }
      );
  }

}
