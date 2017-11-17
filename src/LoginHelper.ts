export function storeTokens(tokens: Tokens, username: string, remember: boolean) {
    if (tokens === undefined) {
        return;
    }
    let storage = remember ? localStorage : sessionStorage;
    let accessTokenKey = 'access_token';
    let refreshTokenKey = 'refresh_token';
    let usernameKey = 'username';

    storage.setItem(accessTokenKey, tokens.access_token as string);
    storage.setItem(refreshTokenKey, tokens.refresh_token as string);
    storage.setItem(usernameKey, username as string);
}

export interface Tokens {
    access_token: string | undefined | null;
    refresh_token: string | undefined | null;
}