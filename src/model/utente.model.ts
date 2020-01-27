import {Voto} from './voto.model';

export class Utente {
  nome: string;
  cognome: string;
  email: string;
  password: string;
  citta: string;
  via: string;
  dataNascita: Date;
  numPartite: number;
  mediaVoto: Voto;
  img: string = "";
}
