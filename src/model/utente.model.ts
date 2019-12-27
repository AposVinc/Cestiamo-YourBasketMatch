import { Voto } from './voto.model';
import {Partita} from "./partita.model";

export class Utente {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  citta: string;
  dataNascita: Date;
  numPartite: number;
  mediaVoto: Voto;
  img: string;

}
