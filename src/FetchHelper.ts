import { Tokens, storeTokens } from './LoginHelper';
import { BASEURL } from './config';

export async function fetchWithToken(url: string, httpMethod: string = '') {
    let local = localStorage.length > 0;
    let session = sessionStorage.length > 0;
    var keys: Tokens = { access_token: undefined, refresh_token: undefined};

    if (local || session) {
        let storage = local ? localStorage : sessionStorage;
        keys = getTokensFromStorage(storage);
    }

    let getTokenURL = (u: string) =>
        (local || session) ? u + `?access_token=${keys.access_token}` : u;

    let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors'
    });

    let options: RequestInit = { headers: headers };
    if (httpMethod !== undefined) {
        options.method = httpMethod;
    }
    
    // Try to get (with tokens if present).
    let initialResponse = await fetch(getTokenURL(url), options);        
    if (initialResponse.status === 401) {
        // If no tokens are present, return received 401.
        if (!local && !session) {
            return initialResponse; 
        }
        
        // Attempt to refresh tokens.
        let refreshOptions = { method: 'POST', body: JSON.stringify({ refresh_token: keys.refresh_token })};
        Object.assign(refreshOptions, options);
        if (httpMethod !== undefined) {
            refreshOptions.method = 'POST';
        }
        let refreshResponse = await fetch(BASEURL + '/refreshtoken', refreshOptions);
        if (refreshResponse.status !== 200) {
            return refreshResponse;
        }
        
        // Save tokens, retry call.
        let json = await refreshResponse.json() as Tokens;

        // TODO: Only use redux storage for user info etc. NO LOCAL/SESSIONSTORAGE!
        storeTokens(json, session !== undefined);
        return await fetch(getTokenURL(url), options);
    } else {
        return initialResponse;
    }
}

export function getTokensFromStorage(storage: Storage): Tokens {
    return { 
        access_token: storage.getItem('access_token'), 
        refresh_token: storage.getItem('refresh_token')
    };
}

export const getUsernameFromStorage = (storage: Storage) => storage.getItem('username');  