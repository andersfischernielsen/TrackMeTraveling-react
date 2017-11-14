import * as React from "react";
import { Redirect } from "react-router";
import { BASEURL } from '../../config' 
import { Tokens, storeTokens } from './../../LoginHelper' 
import { connect } from 'react-redux';
import { login, Store } from '../../redux/reducer';

export interface SignupState {
    username: string,
    password: string,
    email: string,
    shouldRedirect: boolean
} 

interface SignupProps {
    loggedIn: boolean,
    login: any
}

export class SignupComponent extends React.Component<SignupProps, SignupState> {
    constructor(props:any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.handleChange = this.handleChange.bind(this);     
        this.state = {username: undefined, email: undefined, password: undefined, shouldRedirect: false};
    }

    async handleSubmit(event:any) {
        event.preventDefault();
        let headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "no-cors"
        });

        let options = {
            method: 'POST', 
            body: JSON.stringify(this.state), 
            headers: headers
        };

        try {
            let response = await fetch(BASEURL + '/user', options);
            if (response.status == 409) return;
            let json = await response.json() as Tokens;
            storeTokens(json, false);
            this.props.login(this.state.username);
        } catch {
            
        }
    }

    handleChange(event:any) {
        let target = event.target;
        this.setState({[target.name]: target.value});
    }
    
    render() {
        if (this.props.loggedIn) return (<Redirect to='/' />);
        return (
            <div>
                <h1>Sign up</h1>
                <form onSubmit={this.handleSubmit}> 
                <input type="email" name="email" placeholder="E-mail" onChange={this.handleChange}></input>
                <input type="text" name="username" placeholder="Username" onChange={this.handleChange}></input>
                <input name="password" placeholder="Password" type="password" onChange={this.handleChange}></input>
                <input type="submit" value="Sign up"></input>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state:Store) => {
    return {
        loggedIn: state.isLoginSuccess
    };
  }
  
const mapDispatchToProps = (dispatch:any) => {
    return {
        login: (username:string) => dispatch(login(username))
    };
}
  
export const Signup = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);