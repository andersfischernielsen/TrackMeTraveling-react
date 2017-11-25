import * as React from 'react';

export interface NearbySightsProps { 
    lat?: number; 
    lng?: number;
    sights?: Sight[];
}

export interface Sight { 
    title: string;
    description: string;
    imageUrl: string;
    distance: number;
    lat: number;
    lng: number;
}

interface SightProps {
    sight: Sight;
}

class SightComponent extends React.Component<SightProps> {
    render() { return (
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{this.props.sight.title}</h5>
                    <small>{this.props.sight.distance} km</small>
                    </div>
                    <p className="mb-1">
                        {this.props.sight.description}
                    </p>
                    <small>Click for details.</small>
                </a>
            </div>
        );
    }
}

export class NearbySights extends React.Component<NearbySightsProps, {}> {
    constructor(props: NearbySightsProps) {
        super(props);
    }
    
    renderNearbySights() {
        if (!this.props.sights) {
            return null;
        }
        return this.props.sights.map((s, i) => <SightComponent key={i} sight={s} />);
    }
    
    render() {
        let style: React.CSSProperties = { overflow: 'scroll', height: '100%' };
        return (
            <div style={style}>
                {this.renderNearbySights()}
            </div>
        );
    }
}