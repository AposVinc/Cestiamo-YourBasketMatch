import { Time } from "@angular/common";
import { Utente } from './utente.model';
import {Partita} from "./partita.model";

export class Messaggio {
  id: number;
  data: Date;
  ora: Time;
  mittente: Utente;
  testo: string;
  partita: Partita;

}
