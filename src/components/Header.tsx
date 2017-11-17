import * as React from 'react';
import { Link } from 'react-router-dom';
import { Logout } from './login/Logout';
import { UserMenu } from './login/UserMenu';
import { connect } from 'react-redux';
import { Store } from '../redux/reducer';

interface HeaderProps {
    loggedIn: boolean;
}

export class HeaderComponent extends React.Component<HeaderProps, {}> {
    renderLoginLogout(loggedIn: boolean) {
        // TODO: Move to own components render()? 
        return loggedIn 
            ? <li className="nav-item"><Logout /></li>
            : <li className="nav-item"><Link className="nav-link" to="/login">Log in</Link></li>;
    }

    render() { return (
        <header>
            <nav className="nav navbar navbar-expand-lg">
                <Link className="navbar-brand" to="/">Home</Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><Link className="nav-link" to="/signup">Sign up</Link></li>
                        {this.renderLoginLogout(this.props.loggedIn)}
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item"><UserMenu /></li>                    
                    </ul>
                </div>
            </nav>
        </header>
        );
    } 
} 

const mapStateToProps = (state: Store) => {
    return {
        loggedIn: state.loggedIn
    };
};
  
export const Header = connect(mapStateToProps)(HeaderComponent);