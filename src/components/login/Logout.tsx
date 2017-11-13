import * as React from 'react'
import { Redirect } from 'react-router-dom'


interface LogoutState {
    redirect: boolean;
}

export class Logout extends React.Component<{}, LogoutState> {
    constructor() {
        super();
        let cookiesPresent = localStorage.length > 0 || sessionStorage.length > 0;
        this.clearStorage = this.clearStorage.bind(this);             
    }
    
    clearStorage() {
        localStorage.clear();
        sessionStorage.clear();
        this.setState({redirect: true});
    }

    render() {
        if (this.state.redirect) return (<Redirect to='/' />);
        return (<li>
            <a onClick={this.clearStorage}>Log out</a>
        </li>);
    }
}