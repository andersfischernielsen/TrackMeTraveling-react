import * as React from 'react';

export interface NearbySightsProperties { latitude: number; longitude: number; }
export class NearbySights extends React.Component<NearbySightsProperties, {}> {
    render() {
        return (
            <div>
                <h1>Nearby Sights</h1>
                <p>Not implemented.</p>
            </div>
        );
    }
}