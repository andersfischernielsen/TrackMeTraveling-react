import * as React from 'react'
import { Redirect } from 'react-router-dom'

export class Logout extends React.Component<{}, {}> {
    componentWillMount() {
        localStorage.clear();
        sessionStorage.clear();
    }

    render() {
        return <Redirect to='/' />;
    }
}