import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { UsernameHeading } from './Hello';
import { MapView } from '../plugins/MapView';
import { NearbySights } from '../plugins/NearbySights';
import { BASEURL } from '../../config';
import { fetchWithToken } from '../../FetchHelper';

export interface UserData {
    username: string;
    latitude: number;
    longitude: number;
}

export interface UserState {
    loading: boolean;
    authorized: boolean;
    found: boolean;
    data: UserData;
}

interface UserProps {
    username: string;
}

export class User extends React.Component<RouteComponentProps<UserProps>, UserState> {
    constructor(props: RouteComponentProps<UserProps>) {
        super(props);
        this.state = {
            loading: true, 
            authorized: false, 
            found: false, 
            data: {
                username: '',
                latitude: 0, 
                longitude: 0 
            }
        };
    }

    renderLoading = () => (<div>Loading...</div>);
    renderNotFound = () => (<div>User not found.</div>);
    renderUnauthorized = () => (<div>This user is private.</div>);
    renderUserPage = () => (
        <div className="row">
            <UsernameHeading username={this.state.data.username} />
            <MapView latitude={this.state.data.latitude} isMarkerShown={true} longitude={this.state.data.longitude}/>
            <NearbySights latitude={this.state.data.latitude} longitude={this.state.data.longitude} />
        </div>
    )
    
    async getUserData(username: string) {
        try {
            let response = await fetchWithToken(BASEURL + '/user/' + username);        
            if (response.status === 401) {
                this.setState({ loading: false, authorized: false });     
            } else if (response.status === 404) { 
                this.setState({ loading: false, found: false });     
            } else {   
                let json = await response.json() as UserData;
                if (json === undefined) {
                    this.setState((p, ps) => ({found: false}));
                    return;
                }
                this.setState({
                    data: json,
                    found: true,
                    loading: false, 
                    authorized: true
                });
            }
        } catch (e) {
            this.setState({ loading: false, authorized: false });            
        }
    }

    async componentDidMount() {
        let username = this.props.match.params && this.props.match.params.username;
        if (!username) {
            return <Redirect to="/" />;
        }
        await this.getUserData(username);
        return;
    }

    render() {
        if (this.state.loading) { 
            return this.renderLoading();
        } 
        if (this.state.authorized) {
            return this.renderUserPage();
        }
        if (this.state.found === false) {
            return this.renderNotFound();
        }
        return this.renderUnauthorized();
    }
}