import * as React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb:any) {
        this.isAuthenticated = true
    },
    signout(cb:any) {
        this.isAuthenticated = false
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => 
        (fakeAuth.isAuthenticated 
            ? (<Component {...props}/>) 
            : (<Redirect to={{pathname: '/login', state: { from: props.location }}}/>))}
    />
)

export { fakeAuth, PrivateRoute };