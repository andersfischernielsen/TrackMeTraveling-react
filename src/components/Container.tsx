import * as React from "react";
import { Link } from 'react-router-dom'
import { UsernameHeading } from "./Hello"
import { MapView } from "./MapView"
import { NearbySights } from "./NearbySights";
import { Login } from "./Login";

export class Container extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <p>
                    <Link to='/login'>Login</Link> 
                </p>
                <p>
                    <Link to='/fischer'>fischer</Link>
                </p>
            </div>
        );
    }
}

