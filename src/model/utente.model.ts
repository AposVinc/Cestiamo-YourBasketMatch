import { Voto } from './voto.model';
import {Partita} from "./partita.model";

export class Utente {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  password: string;
  citta: string;
  datanascita: Date;
  n_partite: number;
  mediavoto: Voto;
  img: string;

}
