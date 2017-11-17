import * as React from 'react';
import { connect } from 'react-redux';
import { login, Store } from '../../redux/reducer';
import { Tokens, storeTokens } from '../../LoginHelper';
import { getTokensFromStorage } from '../../FetchHelper';

interface UserMenuProps {
    loggedIn: boolean;
    login: (loggedIn: string, accessToken: string, refreshToken: string) => {};
}

// TODO: Implement check for tokens on launch. If present, try to log in. 

class UserMenuComponent extends React.Component<UserMenuProps, {}> {
    renderComponent() {
        return (
            <div>Logged in</div>
        );
    }

    checkForTokens() {
        let session = sessionStorage.length > 0;
        // TODO: Move storage fetch to helper. 
        let storage = session ? sessionStorage : localStorage; 
        let tokens = getTokensFromStorage(storage) as Tokens;
        let username = getUsernameFromStorage(storage);
        let {access_token} = tokens;
        let {refresh_token} = tokens;
        if (access_token === undefined || access_token === null 
            || refresh_token === undefined || refresh_token === null) {
                return;
        }
        storeTokens(tokens, false);
        this.props.login(username, access_token, refresh_token);
    }
    
    render() { 
        this.checkForTokens();
        return this.props.loggedIn ? this.renderComponent() : null;
    }
}

const mapStateToProps = (state: Store) => {
    return {
        loggedIn: state.loggedIn
    };
};
  
const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (username: string, accessToken: string, refreshToken: string) => 
            dispatch(login(username, accessToken, refreshToken))
    };
};
  
export const UserMenu = connect(mapStateToProps, mapDispatchToProps)(UserMenuComponent);