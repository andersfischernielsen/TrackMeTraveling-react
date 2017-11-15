const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
const SET_LOGOUT_SUCCESS = 'SET_LOGOUT_SUCCESS';

export function login(username: string) {
    return (dispatch: any) => {
        dispatch(setLoginSuccess(true));
    };
}

export function logout() {
    return (dispatch: any) => {
        dispatch(setLoginSuccess(false));
    };
}

function setLoginSuccess(isLoginSuccess: boolean) {
    return {
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess
    };
}

export default function reducer(state: Store = { isLoginSuccess: false }, action: any) {
    switch (action.type) {
        case SET_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoginSuccess: action.isLoginSuccess
            });

        case SET_LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isLoginSuccess: action.isLoginSuccess
            });

        default: return state;
    }
}

export interface Store {
    isLoginSuccess: boolean;
}