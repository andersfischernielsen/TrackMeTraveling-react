import * as React from 'react';
const { withScriptjs, withGoogleMap, GoogleMap, Marker } = require('react-google-maps');

export interface MapViewProperties { latitude: number; longitude: number; isMarkerShown: boolean; }
export class MapView extends React.Component<MapViewProperties, {}> {
    render() {
        let coordinates = { lat: this.props.latitude, lng: this.props.longitude };
        let TrackMeMap = withScriptjs(withGoogleMap((props: MapViewProperties) => (
            <GoogleMap defaultZoom={15} defaultCenter={coordinates}>
                {props.isMarkerShown && <Marker position={coordinates} />}
            </GoogleMap>
        )));
        return (
            <TrackMeMap
                isMarkerShown={true}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}