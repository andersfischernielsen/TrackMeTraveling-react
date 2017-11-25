import * as React from 'react';
import { Map, Listing, GoogleApiWrapper } from 'google-maps-react';

interface FetchPlacesProps {
    google?: {};
}

interface FetchPlacesState {
    places?: {}[];
}

export class FetchPlacesContainer extends React.Component<FetchPlacesProps, FetchPlacesState> {
    constructor(props: FetchPlacesProps) {
        super(props);
        this.state = {places: []};        
    }
    
    fetchPlaces(mapProps: any, map: Map) {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        alert(service);
    }

    render() {
        return (
            <Map google={this.props.google} onReady={this.fetchPlaces} visible={false}>
                <Listing places={this.state.places} />
            </Map>
        );
    }
}

export const FetchSights = GoogleApiWrapper({
    apiKey: 'AIzaSyCAZM5I3SYu-POAtKidlCXSOo_Ys9q7spE'
})(FetchPlacesContainer);