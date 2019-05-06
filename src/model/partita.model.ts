import { Time } from "@angular/common";
import { Campo } from './campo.model';

export class Partita {
    tipologia: string;
    id: number;
    nomeCampo: Campo;
    data: Date;
    orario : Time;
    personeMancanti: number;
    
}

export const TIPOLOGIA_PARTITA_UNO = "unoVSuno";
export const TIPOLOGIA_PARTITA_DUE = "dueVSdue";
export const TIPOLOGIA_PARTITA_TRE = "treVStre";
export const TIPOLOGIA_PARTITA_QUATTRO = "quattroVSquattro";
export const TIPOLOGIA_PARTITA_CINQUE = "cinqueVScinque";   // enum su parte server



