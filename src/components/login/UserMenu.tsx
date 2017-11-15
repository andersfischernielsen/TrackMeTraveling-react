import * as React from 'react';
import { connect } from 'react-redux';
import { login, Store } from '../../redux/reducer';

interface UserMenuProps {
    loggedIn: boolean;
    login: (loggedIn: string) => {};
}

class UserMenuComponent extends React.Component<UserMenuProps, {}> {
    renderComponent() {
        return (
            <div>Logged in</div>
        );
    }
    
    render() { 
        if (this.props.loggedIn !== false) {
            return this.renderComponent();
        } 
        return null;
    }
}

const mapStateToProps = (state: Store) => {
    return {
        loggedIn: state.isLoginSuccess
    };
};
  
const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (username: string) => dispatch(login(username))
    };
};
  
export const UserMenu = connect(mapStateToProps, mapDispatchToProps)(UserMenuComponent);