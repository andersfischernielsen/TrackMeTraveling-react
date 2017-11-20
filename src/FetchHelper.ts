import { Tokens, storeState } from './LoginHelper';
import { BASEURL } from './config';
import { store } from './redux/store';
import { login, Store } from './redux/reducer';

export async function fetchWithToken(url: string, httpMethod: string = '') {
    var state = store.getState();
    let getTokenURL = (u: string) =>
        (state) ? u + `?access_token=${state.accessToken}` : u;

    let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors'
    });

    let options: RequestInit = { headers: headers, method: 'GET' };
    if (httpMethod) {
        options.method = httpMethod;
    }
    
    // Try to get (with tokens if present).
    let withToken = getTokenURL(url);
    let initialResponse = await fetch(withToken, options);        
    if (initialResponse.status === 401) {
        // If no tokens are present, return received 401.
        if (!state.accessToken || !state.refreshToken) {
            return initialResponse; 
        }
        
        // Attempt to refresh tokens.
        let refreshOptions = { method: 'POST', body: JSON.stringify({ refresh_token: state.refreshToken })};
        Object.assign(refreshOptions, options);
        if (!httpMethod) {
            refreshOptions.method = 'POST';
        }
        let refreshResponse = await fetch(BASEURL + '/refreshtoken', refreshOptions);
        if (refreshResponse.status !== 200) {
            return refreshResponse;
        }
        
        // Save tokens, retry call.
        let json = await refreshResponse.json() as Tokens;
        store.dispatch(login(state.username as string, json.access_token as string, json.refresh_token as string));
        storeState();
        let withNewToken = getTokenURL(url);
        return await fetch(withNewToken, options);
    } else {
        return initialResponse;
    }
}

export function getTokensFromStorage(storage: Storage): Store|undefined {
    let state = storage.getItem('state');
    if (!state) {
        return undefined; 
    }

    return JSON.parse(state);
}