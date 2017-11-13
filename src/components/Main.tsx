import * as React from 'react'
import { Route, Switch } from 'react-router'
import { Landing } from './Landing'
import { Login } from './login/Login'
import { Logout } from './login/Logout'
import { User } from './user/User'

export class Main extends React.Component<{}, {}> {
    render() { return (
        <main>
            <Switch>
                <Route exact path='/' component={Landing} /> 
                <Route path='/login' component={Login} />
                <Route path='/logout' component={Logout} />
                <Route path='/user/:username' component={User} /> 
            </Switch>
        </main>);
    }
}