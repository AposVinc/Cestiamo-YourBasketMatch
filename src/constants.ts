export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost/cestiamo/api';

export const URL = {
  LOGIN: URL_BASE + '/login',
  LOGOUT: URL_BASE + '/logout',
  CREATE_USER: URL_BASE + '/creaUtente',
  UPDATE_USER: URL_BASE + '/updateUtente',
  URL_IMG: URL_BASE + '/updateImage',

  LISTA_CAMPI: URL_BASE + '/getListaCampi',
  LISTA_PARTITE: URL_BASE + '/getListaPartite',
  MIE_PARTITE: URL_BASE + '/getListaMiePartite',
  PARTITE_GIOCATE: URL_BASE + '/getListaPartiteGiocate',
  PARTITA: URL_BASE + '/partita',
  REMOVE_PARTECIPANTE: URL_BASE + '/removePartecipante',
  ADD_PARTECIPANTE: URL_BASE + '/addPartecipante',
  LISTA_TIPO_PARTITA: URL_BASE + '/getListaTipoPartita',
  NUOVA_PARTITA: URL_BASE + '/nuovaPartita',

  UTENTE: URL_BASE + '/utente',
  VOTAZIONE: URL_BASE + '/votazione',


};

export const X_AUTH = "X-Auth";

export const AUTH_TOKEN = "auth-token";

export const UTENTE_STORAGE = "utente";

export const LINGUA = 'lingua';
