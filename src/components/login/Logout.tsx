import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout, Store } from '../../redux/reducer';

interface LogoutState {
    loggedOut: boolean;
}

interface LogoutProps {
    loggedOut: boolean;
    logout: () => {};
}

export class LogoutComponent extends React.Component<LogoutProps, LogoutState> {
    constructor(props: LogoutProps) {
        super(props);
        this.clearStorage = this.clearStorage.bind(this);    
        this.state = {loggedOut: false};         
    }
    
    clearStorage() {
        localStorage.clear();
        sessionStorage.clear();
        this.props.logout();
        this.setState({loggedOut: true});
    }

    render() {
        if (this.state.loggedOut || this.props.loggedOut) {
            return (<Redirect to="/" />);
        }
        return (<Link className="nav-link" to="" onClick={this.clearStorage}>Log out</Link>);
    }
}

const mapStateToProps = (state: Store) => {
    return {
        loggedOut: !state.isLoginSuccess
    };
};
  
const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch(logout())
    };
};
  
export const Logout = connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);