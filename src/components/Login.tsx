import * as React from "react";

export class Login extends React.Component<{}, {}> {
    constructor(props:any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }

    handleSubmit(event:any) {
        event.preventDefault();
    }
    
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form id="loginForm" onSubmit={this.handleSubmit}> 
                <label>Username
                    <input type="text"></input>
                </label>
                <label>Password
                    <input type="password"></input>
                </label>
                </form>
            </div>
        );
    }
}