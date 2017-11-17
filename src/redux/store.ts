import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const initial = {
    username: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    loggedIn: false
};

const store = createStore(reducer, initial, applyMiddleware(thunk));
export { store };