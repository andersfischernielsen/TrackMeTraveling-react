import * as React from 'react';

export class UsernameHeading extends React.Component<{username?: string}> {
    render() {
        return <h1>{this.props.username}</h1>;
    }
}