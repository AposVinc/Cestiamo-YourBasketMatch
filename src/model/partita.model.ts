import { Campo } from './campo.model';
import { Utente } from "./utente.model";
import { Bacheca } from "./bacheca.model";
import { Tipopartita } from "./tipopartita.model";

export class Partita {
    tipologia: Tipopartita;
    id: number;
    campo: Campo;
    data: Date;
    personeMancanti: number;
    partecipanti: Utente;
    bacheca: Bacheca;
}




