import { Time } from "@angular/common";
import { Campo } from './campo.model';
import {Utente} from "./utente.model";
import {Bacheca} from "./bacheca.model";
import {Tipopartita} from "./tipopartita.model";

export class Partita {
    tipologia: Tipopartita;
    id: number;
    nomeCampo: Campo;
    data: Date;
    orario : Time;
    //personeMancanti: number;
    //partecipanti: Utente;
    //bacheca: Bacheca;
}




