import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";
import { UsernameHeading } from "./Hello"
import { MapView } from "./MapView"
import { NearbySights } from "./NearbySights";
import { BASEURL } from '../../config'

export interface UserState {
    loading: boolean,
    authorized: boolean
}

export interface Data {
    username: string;
    latitude: number;
    longitude: number;
}
export interface UserProperties extends RouteComponentProps<any> { data: Data }

export class User extends React.Component<UserProperties, UserState> {
    renderLoading = () => (<div>Loading...</div>);
    renderUnauthorized = () => (<div>This user is private.</div>);
    renderUserPage = () => (
        <div>
            <UsernameHeading username={this.props.data.username} />
            <MapView latitude={this.props.data.latitude} longitude={this.props.data.longitude} />
            <NearbySights latitude={this.props.data.latitude} longitude={this.props.data.longitude} />
        </div>);
    
    componentDidMount() {
        let username = this.props.match.params;
        if (!username) return <Redirect to='/' />

        //TODO: Fetch whether username is public, if not prompt to log in, otherwise show.
        //TODO: GET with token (if any). 
        //      If unauthorized, refresh tokens, then try again. 
        fetch(BASEURL + '/visibility?username=' + username)
            .then(res => res.json())
            .then(
                allowed => this.setState({ loading: false, authorized: true }),
                error => this.setState({ loading: false, authorized: false  })
            );
    }

    render() {
        if (this.state.loading) return this.renderLoading();
        if (this.state.authorized) return this.renderUserPage();
        return this.renderUnauthorized();
    }
}

