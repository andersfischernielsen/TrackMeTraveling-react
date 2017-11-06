import * as React from "react";
import { Redirect } from "react-router";

export interface ILoginState {
    username: string,
    password: string,
    remember: boolean,
    shouldRedirect: boolean
} 

interface ITokens {
    access_token: string,
    refresh_token: string
}

export class Login extends React.Component<{}, ILoginState> {
    constructor(props:any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.handleChange = this.handleChange.bind(this);     
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
            let response = await fetch('http://localhost:5000/auth', options);
            if (response.status == 401) return;
            let json = await response.json() as ITokens;
            this.storeTokens(json);
            return <Redirect to="/:" />
        } catch {
            //TODO: Do things when error occures.
        }
    }

    storeTokens(tokens:ITokens) {
        if (tokens === undefined) return;
        let storage = this.state.remember ? localStorage : sessionStorage;
        let access_token_key = `TrackMeTraveling:${this.state.username}:access_token`;
        let refresh_token_key = `TrackMeTraveling:${this.state.username}:refresh_token`;
        storage.setItem(access_token_key, tokens.access_token);
        storage.setItem(refresh_token_key, tokens.refresh_token);
    }

    handleChange(event:any) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({[target.name]: value});
    }
    
    render() {
        let shouldRedirect = this.state;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}> 
                <input type="text" name="username" placeholder="Username" onChange={this.handleChange}></input>
                <input name="password" placeholder="Password" type="password" onChange={this.handleChange}></input>
                <label> Remember me
                    <input name="remember" type="checkbox" onChange={this.handleChange}></input>
                </label>
                <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}