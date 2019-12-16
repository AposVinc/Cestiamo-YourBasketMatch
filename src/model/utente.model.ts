import { Voto } from './voto.model';

export class Utente {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  password: string;
  citta: string;
  datanascita: Date;
  partitegiocate: number;
  mediavoto: Voto;
  img: string;

}
