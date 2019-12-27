import { Campo } from './campo.model';
import { Utente } from "./utente.model";
import { Bacheca } from "./bacheca.model";
import { Tipopartita } from "./tipopartita.model";

export class Partita {
    id: number;
    tipologia: Tipopartita;
    campo: Campo;
    data: Date;
    personeMancanti: number;
    partecipanti: Array<Utente>;
    bacheca: Bacheca;
    //utente:Utente;
}




