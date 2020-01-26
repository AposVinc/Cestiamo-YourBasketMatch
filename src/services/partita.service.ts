import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Storage} from '@ionic/storage';
import {URL} from '../constants';
import {Partita} from '../model/partita.model';
import {Campo} from "../model/campo.model";
import {Tipopartita} from "../model/tipopartita.model";

@Injectable()
export class PartitaService {

  constructor(private http: HttpClient, public storage: Storage) {
  }

  create(partita: Partita) {
    return this.http.post<Partita>(URL.NUOVA_PARTITA, partita).toPromise()
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

  listPartiteByCampo(campo: Campo): Observable<Array<Partita>> {
    let Url = `${URL.LISTA_PARTITE}/campo=${campo.id}`;
    return this.http.get<Array<Partita>>(Url);
  }

  listMiePartite(): Observable<Array<Partita>> {
    let Url = `${URL.MIE_PARTITE}`;
    return this.http.get<Array<Partita>>(Url);
  }

  listMiePartiteGiocate(): Observable<Array<Partita>> {
    let Url = `${URL.PARTITE_GIOCATE}`;
    return this.http.get<Array<Partita>>(Url);
  }

  listCampi(): Observable<Array<Campo>> {
    return this.http.get<Array<Campo>>(URL.LISTA_CAMPI)
  }

  ListTypeMatch(): Observable<Array<Tipopartita>> {
    return this.http.get<Array<Tipopartita>>(URL.LISTA_TIPO_PARTITA)
  }


  findById(partitaId: number): Observable<Partita> {
    let apiURL = `${URL.PARTITA}/${partitaId}`;
    return this.http.get<Partita>(apiURL);
  }

  checkIfUtenteLoggatoPartecipate(partitaId: number): Observable<boolean> {
    let apiURL = `${URL.CHECK_IS_PARTECIPANTE}/${partitaId}`;
    return this.http.get<boolean>(apiURL);
  }

  addUtente(partitaId: number) {
    let url = `${URL.ADD_PARTECIPANTE}/partita=${partitaId}`;
    return this.http.put<Partita>(url, null, {observe: 'response'})
      .map((resp: HttpResponse<Partita>) => {
        return resp.body;
      });
  }

  removeUtente(partitaId: number) {
    let deleteUrl = `${URL.REMOVE_PARTECIPANTE}/partita=${partitaId}`;
    return this.http.delete<Partita>(deleteUrl);
  }

}
