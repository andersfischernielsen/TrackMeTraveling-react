import * as React from 'react';
import { connect } from 'react-redux';
import { login, Store } from '../../redux/reducer';
import { store } from '../../redux/store';
import { storeState } from '../../LoginHelper';
import { getTokensFromStorage } from '../../FetchHelper';

interface UserMenuProps {
    loggedIn: boolean;
    username: string;
    login: (loggedIn: string, accessToken: string, refreshToken: string) => {};
}

class UserMenuComponent extends React.Component<UserMenuProps, {}> {
    renderComponent() {
        return (
            <div className="row">
                <div className="col-xs-3">
                    <img src="https://placeholdit.co//i/80x80" width="40px" height="40px"/>
                </div>
                <div className="col-sm-7 offset-sm-1">
                    <p>{this.props.username}</p>
                </div>
            </div>
        );
    }

    checkForTokens() {
        let state = store.getState();
        if (!state || state.loggedIn === true) {
            return;
        }
        let fromStorage = getTokensFromStorage(localStorage) as Store;
        if (!fromStorage || !fromStorage.accessToken || !fromStorage.refreshToken) {
            return;
        }

        let accessToken = fromStorage.accessToken as string;
        let username = fromStorage.username as string;
        let refreshToken = fromStorage.refreshToken as string;
        if (accessToken === undefined && username === undefined && refreshToken === undefined) {
            return;
        }

        // TODO: Implement check if actually can log in.
        this.props.login(username, accessToken, refreshToken);
        storeState();
    }
    
    render() { 
        this.checkForTokens();
        return this.props.loggedIn ? this.renderComponent() : null;
    }
}

const mapStateToProps = (state: Store) => {
    return {
        loggedIn: state.loggedIn,
        username: state.username
    };
};
  
const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (username: string, accessToken: string, refreshToken: string) => 
            dispatch(login(username, accessToken, refreshToken))
    };
};
  
export const UserMenu = connect(mapStateToProps, mapDispatchToProps)(UserMenuComponent);