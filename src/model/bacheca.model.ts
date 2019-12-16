import { Time } from "@angular/common";
import { Utente } from './utente.model';

export class Bacheca {
  id: number;
  data: Date;
  ora: Time;
  mittente: Utente;
  testo: string;


}
