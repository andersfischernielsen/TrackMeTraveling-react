import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Redirect } from 'react-router-dom';
import { UsernameHeading } from './UsernameHeading';
import { MapView } from '../plugins/MapView';
import { NearbySights, Sight } from '../plugins/NearbySights';
import { BASEURL } from '../../config';
import { fetchWithToken, getNearbySights } from '../../FetchHelper';

interface UserProps {
    username: string;
}

interface UserData {
    username?: string;
    latitude?: number;
    longitude?: number;
    sights?: Sight[];
}

interface UserState {
    loading: boolean;
    authorized: boolean;
    found: boolean;
    data?: UserData;
}

export class User extends React.Component<RouteComponentProps<UserProps>, UserState> {
    constructor(props: RouteComponentProps<UserProps>) {
        super(props);
        this.state = {
            loading: true, 
            authorized: false, 
            found: false
        };
    }

    receiveSights = (receivedSights: Sight[]) => {
        this.setState((s, p) => ({sights: receivedSights}));
    }

    renderLoading = () => (<div>Loading...</div>);
    renderNotFound = () => (<div>User not found.</div>);
    renderUnauthorized = () => (<div>This user is private.</div>);
    renderUserPage = () => {
        let data = this.state.data;
        if (!data) {
            return null;
        }

        let style = {
            'maxHeight': '400px'
        };

        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <UsernameHeading username={data.username}/>
                    </div>
                </div>
                <div className="row" style={style}>
                    <div className="col-sm-8">
                        <MapView 
                            username={data.username}
                            lat={data.latitude} 
                            lng={data.longitude}
                            onReceiveSights={this.receiveSights}
                        /> 
                    
                    </div>
                    <div className="col-sm-4">
                        <NearbySights 
                            lat={data.latitude} 
                            lng={data.longitude}
                            sights={data.sights}
                        />
                    </div>
                </div>
            </div>
        );
    }

    async getSights(latitude?: number, longitude?: number) {
        if (!latitude || !longitude) {
            return;
        }
        return await getNearbySights(latitude, longitude) as Sight[];
    }
    
    async getUserData(username: string): Promise<UserState|undefined> {
        try {
            let response = await fetchWithToken(BASEURL + '/user/' + username);        
            if (response.status === 401) {
                this.setState({ loading: false, authorized: false });     
                return undefined;
            } else if (response.status === 404) { 
                this.setState({ loading: false, found: false });     
                return undefined;
            } else {   
                let json = await response.json() as UserData;
                if (json === undefined) {
                    this.setState((p, ps) => ({found: false}));
                    return undefined;
                }

                json.sights = await this.getSights(json.latitude, json.longitude);
                return {
                    data: json,
                    found: true,
                    loading: false, 
                    authorized: true
                };
            }
        } catch (e) {
            return { loading: false, authorized: false, found: false, data: undefined };   
        }
    }

    async componentWillMount() {
        let username = this.props.match.params && this.props.match.params.username;
        if (!username) {
            return <Redirect to="/" />;
        }
        let u = username + '';
        let result = await this.getUserData(u);
        let state = result as UserState;
        if (state) { 
            this.setState({
                    authorized: state.authorized, 
                    found: state.found, 
                    loading: false, 
                    data: state.data
                });
        }
        return;
    }

    render() {
        if (this.state.loading) { 
            return this.renderLoading();
        } 
        if (this.state.authorized) {
            return this.renderUserPage();
        }
        if (!this.state.found) {
            return this.renderNotFound();
        }
        return this.renderUnauthorized();
    }
}