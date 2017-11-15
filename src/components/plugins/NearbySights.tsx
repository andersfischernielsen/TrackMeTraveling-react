import * as React from 'react';

export interface NearbySightsProperties { latitude: number; longitude: number; }
export class NearbySights extends React.Component<NearbySightsProperties, {}> {
    // TODO: Implement
    renderNearbySights() {
        return <p> Not implemented. </p>;
    }
    
    render() {
        return (
            <div>
                <h1>Nearby Sights</h1>
                {this.renderNearbySights()}
            </div>
        );
    }
}