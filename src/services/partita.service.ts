import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Storage} from '@ionic/storage';
import {URL} from '../constants';
import {Partita} from '../model/partita.model';
import {Campo} from "../model/campo.model";
import {Tipopartita} from "../model/tipopartita.model";
import {Utente} from "../model/utente.model";

@Injectable()
export class PartitaService {

  constructor(private http: HttpClient, public storage: Storage) {
  }

  create(partita: Partita, creatore: Utente) {
    let body = {partita, creatore};
    return this.http.post<Partita>(URL.NUOVA_PARTITA, body).toPromise()
      .then((response: Partita) => {
        return response;
      }).catch(error => {
          console.error()
        }
      );
  }

  list(): Observable<Array<Partita>> {
    return this.http.get<Array<Partita>>(URL.LISTA_PARTITE);
  }

  listMiePartite(utenteEmail: String): Observable<Array<Partita>> {
    let Url = `${URL.MIE_PARTITE}/utente=${utenteEmail}`;
    return this.http.get<Array<Partita>>(Url);
  }

  listMiePartiteGiocate(utenteEmail: String): Observable<Array<Partita>> {
    let Url = `${URL.PARTITE_GIOCATE}/utente=${utenteEmail}`;
    return this.http.get<Array<Partita>>(Url);
  }

  findById(partitaId: number): Observable<Partita> {
    let apiURL = `${URL.PARTITA}/${partitaId}`;
    return this.http.get<Partita>(apiURL);
  }

  listCampi(): Observable<Array<Campo>> {
    return this.http.get<Array<Campo>>(URL.LISTA_CAMPI)
  }

  ListTypeMatch(): Observable<Array<Tipopartita>> {
    return this.http.get<Array<Tipopartita>>(URL.LISTA_TIPO_PARTITA)
  }

  addUtente(partitaId: number, utenteEmail: string) {
    let url = `${URL.ADD_PARTECIPANTE}/partita=${partitaId}/utente=${utenteEmail}`;
    return this.http.put<Partita>(url, null, {observe: 'response'})
      .map((resp: HttpResponse<Partita>) => {
        return resp.body;
      });
  }

  removeUtente(partitaId: number, utenteEmail: string) {
    let deleteUrl = `${URL.REMOVE_PARTECIPANTE}/partita=${partitaId}/utente=${utenteEmail}`;
    return this.http.delete<Partita>(deleteUrl);
  }

}
