import * as React from 'react';

export interface UsernameHeadingProperties { username: string; }

export class UsernameHeading extends React.Component<UsernameHeadingProperties, {}> {
    render() {
        return <h1>{this.props.username}</h1>;
    }
}