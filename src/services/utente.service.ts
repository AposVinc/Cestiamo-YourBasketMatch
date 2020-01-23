import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Utente} from '../model/utente.model';
import {AUTH_TOKEN, URL, UTENTE_STORAGE, X_AUTH} from '../constants';
import {Storage} from '@ionic/storage';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {GlobalProvider} from "../providers/global/global";


@Injectable()
export class UtenteService {
  private tokenUtente: string;

  constructor(public http: HttpClient, public storage: Storage, public global: GlobalProvider) {
    this.storage.get(AUTH_TOKEN).then((token) => {
      this.tokenUtente = token;
    });
  }

  create(user: Utente) {
    return this.http.post<Utente>(URL.CREATE_USER, user).toPromise()
      .then((response: Utente) => {
        return response;
      }).catch(error => {
          console.error()
        }
      );
  }


  login(account: Account): Observable<Utente> {
    return this.http.post<Utente>(URL.LOGIN, account, {observe: 'response'})
      .map((resp: HttpResponse<Utente>) => {
        const token = resp.headers.get(X_AUTH);
        this.storage.set(AUTH_TOKEN, token);
        this.tokenUtente = token;
        this.storage.set(UTENTE_STORAGE, resp.body);
        this.global.isLogged = true;
        return resp.body;
      });
  }

  updateImage(image) {
    return this.http.post(URL.URL_IMG, image, {observe: 'response'}).toPromise()
      .then((response: HttpResponse<Utente>) => {
        this.storage.set(UTENTE_STORAGE, response.body);
        return response;
      }).catch(error => {
        console.log(error)
      });
  }

  logout() {
    this.tokenUtente = "";
    this.storage.remove(AUTH_TOKEN);
    this.storage.remove(UTENTE_STORAGE);
    this.global.isLogged = false;
  }

  getUtente(): Observable<Utente> {
    return fromPromise(this.storage.get(UTENTE_STORAGE));
  }

  getUtenteToken(): string {
    return this.tokenUtente;
  }

  updateProfilo(nuovoUtente: Utente): Observable<Utente> {
    return this.http.post<Utente>(URL.UPDATE_USER, nuovoUtente, {observe: 'response'})
      .map((resp: HttpResponse<Utente>) => {
         if(resp.body.img.length===0) {
           resp.body.img = "../../assets/imgs/avatar.png";
         }
        this.storage.set(UTENTE_STORAGE, resp.body);
        return resp.body;
      });
  }

  getUtenteByEmail(utenteEmail: string): Observable<Utente> {
    let apiURL = `${URL.UTENTE}/${utenteEmail}`;
    return this.http.get<Utente>(apiURL);
  }

  votaUtente(votato: Utente, voto: number){
    let body = { votato, voto };
    return this.http.post<Utente>(URL.VOTAZIONE, body).toPromise()
      .then((response: Utente) => {
        return response;
      }).catch(error => {
          console.error()
        }
      );
  }

  getVoto(votatoEmail: string){
    let apiURL = `${URL.VOTAZIONE}/votato=${votatoEmail}`;
    return this.http.get<number>(apiURL);
  }

}

export interface Account {
  username: string;
  password: string;
}
