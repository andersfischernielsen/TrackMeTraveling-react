import * as React from 'react'
import { Link } from 'react-router-dom'

export class Header extends React.Component<any, any> {
render() { return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/login'>Log in</Link></li>
                    <li><Link to='/logout'>Log out</Link></li>
                </ul>
            </nav>
        </header>
        );
    } 
} 