export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost/cestiamo/api';

export const URL = {
    LOGIN: URL_BASE + '/login',
    LOGOUT: URL_BASE + '/logout',
    UPDATE_PROFILO: URL_BASE + '/utente/updateprofilo',

    LISTA_PARTITE: URL_BASE + '/getListaPartite',
    PARTITA: URL_BASE + '/getPartita',

};

export const X_AUTH = "X-Auth";

export const AUTH_TOKEN = "auth-token";

export const UTENTE_STORAGE = "utente";

export const LINGUA = 'lingua';
