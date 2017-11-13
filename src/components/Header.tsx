import * as React from 'react'
import { Link } from 'react-router-dom'
import { Logout } from './login/Logout';

interface HeaderState {
    loggedIn: boolean
}

export class Header extends React.Component<{}, HeaderState> {
    render() { return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Log in</Link></li>
                    <Logout />
                </ul>
            </nav>
        </header>
        );
    } 
} 