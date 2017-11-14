import * as React from 'react'
import { Redirect, Link } from 'react-router-dom'


interface LogoutState {
    redirect: boolean;
}

export class Logout extends React.Component<{}, LogoutState> {
    constructor() {
        super();
        let cookiesPresent = localStorage.length > 0 || sessionStorage.length > 0;
        this.clearStorage = this.clearStorage.bind(this);    
        this.state = {redirect: false};         
    }
    
    clearStorage() {
        localStorage.clear();
        sessionStorage.clear();
        this.setState({redirect: true});
    }

    render() {
        if (this.state.redirect) return (<Redirect to='/' />);
        return (<Link className="nav-link" to='' onClick={this.clearStorage}>Log out</Link>);
    }
}