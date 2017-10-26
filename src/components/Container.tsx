import * as React from "react";
import { UsernameHeading } from "./Hello"
import { MapView } from "./MapView"
import { NearbySights } from "./NearbySights";

export interface Data {
    username: string;
    latitude: number;
    longitude: number;
}
export interface ContainerProperties {data: Data }
export class Container extends React.Component<ContainerProperties, {}> {
    render() {
        return (
            <div>
                <UsernameHeading username={this.props.data.username} />
                <MapView latitude={this.props.data.latitude} longitude={this.props.data.longitude} />
                <NearbySights latitude={this.props.data.latitude} longitude={this.props.data.longitude} />
            </div>
        );
    }
}

