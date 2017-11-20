import { store } from './redux/store';

export function storeState() {
    let stateKey = 'state';
    localStorage.setItem(stateKey, JSON.stringify(store.getState()));
}

export interface Tokens {
    access_token: string | undefined | null;
    refresh_token: string | undefined | null;
}