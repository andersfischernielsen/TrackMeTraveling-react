import * as React from 'react';
import { BASEURL } from '../../config';
import { Tokens, storeTokens } from './../../LoginHelper'; 
/*
import { connect } from 'react-redux';
import { login, Store } from '../../redux/reducer';
*/

export interface SignupState {
    username: string;
    password: string;
    email: string;
    shouldRedirect: boolean;
} 

interface SignupProps {
    loggedIn: boolean;
    shouldShow: boolean;
    login: any;
}

export class SignupComponent extends React.Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.handleChange = this.handleChange.bind(this);     
        this.state = {username: '', email: '', password: '', shouldRedirect: false};
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

        let response = await fetch(BASEURL + '/user', options);
        if (response.status === 409) {
            return;
        }
        let json = await response.json() as Tokens;
        storeTokens(json, false);
        this.props.login(this.state.username);
    }

    handleChange(event: any) {
        let target = event.target;
        this.setState({[target.name]: target.value});
    }
    
    render() {
        if (this.props.shouldShow === false) { return null; }
        return (
            <div>
                <h1>Sign up</h1>
                <form onSubmit={this.handleSubmit}> 
                <input type="email" name="email" placeholder="E-mail" onChange={this.handleChange} />
                <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                <input name="password" placeholder="Password" type="password" onChange={this.handleChange} />
                <input type="submit" value="Sign up" />
                </form>
            </div>
        );
    }
}

export const Signup = /*connect(mapStateToProps, mapDispatchToProps)(*/SignupComponent/*)*/;