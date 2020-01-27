import {Utente} from './utente.model';
import {Partita} from "./partita.model";

export class Messaggio {
  id: number;
  mittente: Utente;
  data: Date;
  testo: string;
  partita: Partita;
}
