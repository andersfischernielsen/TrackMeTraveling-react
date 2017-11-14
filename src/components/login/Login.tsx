import * as React from "react";
import { Redirect } from "react-router";
import { BASEURL } from '../../config' 
import { Tokens, storeTokens } from './LoginHelper' 

export interface ILoginState {
    username: string,
    password: string,
    remember: boolean,
    shouldRedirect: boolean
} 

export class Login extends React.Component<{}, ILoginState> {
    constructor(props:any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);        
        this.handleChange = this.handleChange.bind(this);     
        this.state = {username: undefined, password: undefined, remember: false, shouldRedirect: false};
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
            let response = await fetch(BASEURL + '/auth', options);
            if (response.status == 401) return;
            let json = await response.json() as Tokens;
            storeTokens(json, this.state.username, this.state.remember);
            this.setState((prev, props) => ({shouldRedirect: true}));
        } catch {
            
        }
    }

    handleChange(event:any) {
        let target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({[target.name]: value});
    }
    
    render() {
        if (this.state.shouldRedirect === true) return (<Redirect to={`user/${this.state.username}`} />);
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