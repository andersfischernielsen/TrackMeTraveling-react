import * as React from 'react';

export interface MapViewProperties { 
    latitude: number; 
    longitude: number; 
    isMarkerShown: boolean; 
}

export class MapView extends React.Component<MapViewProperties, {}> {

    // TODO: Implement.
    getSights = () => {
        return;
    }
    
    // TODO: Implement.
    renderMapWithLazySights() { 
        return (<p> Not implemented. </p>);
    }
    
    render() {
        return (
            <div>
                {this.renderMapWithLazySights()}
            </div>
        );
    }
}