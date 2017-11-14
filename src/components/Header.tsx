import * as React from 'react'
import { Link } from 'react-router-dom'
import { Logout } from './login/Logout';

interface HeaderState {
    loggedIn: boolean
}

export class Header extends React.Component<{}, HeaderState> {
    render() { return (
        <header>
            <nav className="nav navbar navbar-expand-lg">
                <Link className="navbar-brand" to='/'>Home</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to='/signup'>Sign up</Link></li>
                        <li className="nav-item"><Link className="nav-link" to='/login'>Log in</Link></li>
                        <li className="nav-item"><Logout /></li>
                    </ul>
                </div>
            </nav>
        </header>
        );
    } 
} 