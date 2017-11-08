import * as React from "react";
import * as DOM from "react-dom";
import { Route, Switch } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import { Landing } from "./components/Landing";
import { User, Data } from "./components/User";
import { Login } from "./components/Login";

DOM.render(
    <BrowserRouter> 
        <Switch>
            <Route path="/" component={Landing} /> 
            <Route path="/login" component={Login} />

{
            <Route path="/:username" component={User} /> 
            //TODO: Implement header and top-level component with header + content.
            //      Header should have check for tokens.
            //TODO: Add onEnter action for checking whether user is restricted. 
            //      If restricted, redirect to login, where token is stored.
}
        </Switch>
    </BrowserRouter>,
    document.getElementById("container")
);