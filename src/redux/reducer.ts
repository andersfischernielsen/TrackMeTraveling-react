const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export function login(username: string, accessToken: string, refreshToken: string) {
    return (dispatch: any) => {
        dispatch(loginUser(username, accessToken, refreshToken));
    };
}

export function logout() {
    return (dispatch: any) => {
        dispatch(logoutUser());
    };
}

function loginUser(username: string, accessToken: string, refreshToken: string) {
    return {
        type: LOGIN,
        username: username, 
        accessToken: accessToken,
        refreshToken: refreshToken
    };
}

function logoutUser() {
    return {
        type: LOGOUT,
    };
}

export default function reducer(state: Store, action: any): Store {
    switch (action.type) {
        case LOGIN:
            return {
                username: action.username,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                loggedIn: true
            };
        case LOGOUT:
            return {
                username: undefined,
                accessToken: undefined,
                refreshToken: undefined,
                loggedIn: false
            };
        default: return state;
    }
}

export interface Store {
    username?: string;
    accessToken?: string;
    refreshToken?: string;
    loggedIn: boolean;
}