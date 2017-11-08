import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route } from "react-router";
import { PrivateRoute } from "./components/Auth";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Container } from "./components/Container";
import { User, Data } from "./components/User";
import { Login } from "./components/Login";

let data : Data = {
    username: "fischer",
    latitude: 55.663685,
    longitude: 12.598535
}

ReactDOM.render(
    <Router> 
        <div>
            <Route path="/" component={Container} /> 
            <Route path="/login" component={Login} />
            <PrivateRoute path="/:username" component={User} render={() => <User data={this.data} />}/>
        </div>
    </Router>,
    document.getElementById("container")
);