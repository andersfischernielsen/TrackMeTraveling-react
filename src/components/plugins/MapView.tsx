import * as React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

interface MapProps {
    lat?: number;
    lng?: number;
    username?: string;
    google?: {};
}

export class MapViewContainer extends React.Component<MapProps> {
    constructor(props: MapProps) {
        super(props);
    }

    async getNearbySights(mapProps: MapProps, map: any) {
        map.zoom = 6;
    }
    
    render() {
        let style = {height: '400px'};
        return (
        <Map style={style} google={this.props.google} onReady={this.getNearbySights} zoom={14}>
            <Marker position={{lat: this.props.lat, lng: this.props.lng}} />
            <InfoWindow>
                <div>
                    <p>{this.props.username}</p>
                </div>
            </InfoWindow>
        </Map>
        );
    }
}

export const MapView = GoogleApiWrapper({
    apiKey: 'AIzaSyCAZM5I3SYu-POAtKidlCXSOo_Ys9q7spE'
})(MapViewContainer);