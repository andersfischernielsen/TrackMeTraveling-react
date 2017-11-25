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

export async function getNearbySights(latitude: number, longitude: number) {
    if (!latitude || !longitude) {
        return;
    }

    let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    let options: RequestInit = { 
        headers: headers, 
        method: 'GET',
    };
    
    let types = [
        // 'cafe',
        'cemetery',
        'church',
        'embassy',
        'hindu_temple',
        'library',
        // 'lodging',
        'mosque',
        'local_government_office',
        'museum',
        'night_club',
        'park',
        // 'school',
        // 'restaurant', // ??
        'rv_park',
        // 'shopping_mall', // ??
        // 'spa',
        'stadium',
        'synagogue',
        // 'train_station',
        // 'university',
        'zoo'
    ];

    let results = await Promise.all(types.map(async t => {
        let url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
        `${latitude},${longitude}&type=${t}` +
        '&rankby=prominence&radius=2000&key=AIzaSyCAZM5I3SYu-POAtKidlCXSOo_Ys9q7spE';

        let response = await fetch(url, options);
        if (!response) {
            return;
        }

        let asJSON = await response.json();
        if (!asJSON) {
            return;
        }

        return asJSON.results.map(s => { 
            return {
                title: s.name,
                description: s.vicinity,
                imageUrl: s.icon,
                lat: s.geometry.location.lat,
                lng: s.geometry.location.lng
            };
        });
    }));
    
    let reduced = results.reduce((rs, c) => c.concat(rs));
    let set = new Set(reduced);
    return Array.from(set);
}

export function getTokensFromStorage(storage: Storage): Store|undefined {
    let state = storage.getItem('state');
    if (!state) {
        return undefined; 
    }

    return JSON.parse(state);
}