import * as React from 'react';
import { Redirect } from 'react-router';
import { BASEURL } from '../../config';
import { connect } from 'react-redux';
import { Tokens, storeTokens } from './../../LoginHelper'; 
import { login, Store } from '../../redux/reducer';

export interface LoginState {
    username: string;
    password: string;
    remember: boolean;
    loggedIn: boolean;
} 

interface LoginProps {
    loggedIn: boolean;
    login: (loggedIn: string) => {};
}

class LoginComponent extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.handleChange = this.handleChange.bind(this);     
        this.state = {username: '', password: '', remember: false, loggedIn: false};
    }

    async handleSubmit(event: any) {
        event.preventDefault();
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': 'no-cors'
        });

        let options = {
            method: 'POST', 
            body: JSON.stringify(this.state), 
            headers: headers
        };

        let response = await fetch(BASEURL + '/auth', options);
        if (response.status === 401) { return; }
        let json = await response.json() as Tokens;
        storeTokens(json, this.state.remember);
        this.props.login(this.state.username);
    }

    handleChange(event: any) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({[target.name]: value});
    }

    render() {
        if (this.props.loggedIn) {
            return (<Redirect to={`user/${this.state.username}`} />);
        }
        
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}> 
                <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                <input name="password" placeholder="Password" type="password" onChange={this.handleChange} />
                <label> Remember me
                    <input name="remember" type="checkbox" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                </form>
            </div>
        );
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
  
export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);