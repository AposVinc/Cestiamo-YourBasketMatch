import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { UtenteService } from "./utente.service";
import { URL } from '../constants';
import { Partita } from '../model/partita.model';
import { Campo } from "../model/campo.model";
import {Tipopartita } from "../model/tipopartita.model";
import {Utente} from "../model/utente.model";

@Injectable()
export class PartitaService {

    constructor(private http: HttpClient, public storage: Storage, public utenteService: UtenteService) {
    }

    create(p: Partita) {
      this.utenteService.getUtente().subscribe((utente) => {
        //add utente a partita appena creata
        //p.partecipanti = utente;
        p.utente = utente;
        return this.http.post<Partita>(URL.NUOVA_PARTITA, p).toPromise()
          .then((response: Partita) => {
            return response;
          }).catch(error => {
              console.error()
            }
          );
      });
    }

    list(): Observable<Array<Partita>> {
      return this.http.get<Array<Partita>>(URL.LISTA_PARTITE);
    }

    findById(partitaId: number): Observable<Partita> {
      let apiURL = `${URL.PARTITA}/${partitaId}`;
      return this.http.get<Partita>(apiURL);
    }

    listCampi(): Observable<Array<Campo>>{
      return this.http.get<Array<Campo>> (URL.LISTA_CAMPI)
    }

    ListTypeMatch(): Observable<Array<Tipopartita>>{
      return this.http.get<Array<Tipopartita>> (URL.LISTA_TIPO_PARTITA)
    }

    addUtente(partitaId: number, utenteEmail: string){
      let url =  `${URL.ADD_PARTECIPANTE}/partita=${partitaId}/utente=${utenteEmail}`;
      let body={"id_p": partitaId, "mail_u" :utenteEmail};
      return this.http.put<Partita>(url,null,{ observe: 'response' })
        .map((resp :HttpResponse<Partita>)=> {
          return resp.body;
        });
    }

    removeUtente(partitaId: number, utenteEmail: string){
      let deleteUrl = `${URL.REMOVE_PARTECIPANTE}/partita=${partitaId}/utente=${utenteEmail}`;
      return this.http.delete<Partita>(deleteUrl);
    }

}

