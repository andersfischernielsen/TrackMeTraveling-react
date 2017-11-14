export function storeTokens(tokens:Tokens, username: string, remember: boolean) {
    if (tokens === undefined) return;
    let storage = remember ? localStorage : sessionStorage;
    let access_token_key = `${username}:access_token`;
    let refresh_token_key = `${username}:refresh_token`;
    storage.setItem(access_token_key, tokens.access_token);
    storage.setItem(refresh_token_key, tokens.refresh_token);
}

export interface Tokens {
    access_token: string,
    refresh_token: string
}