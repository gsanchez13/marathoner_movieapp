import React, { Component } from 'react';
import { Switch, Link, Route } from 'react-router-dom';
import Home from './Home';
import Users from './Users';
import Shows from './Shows'
import About from './About';

class NavBar extends Component {
    render() {
        return (
            <div>
                <div className="navbar" >
                    <div className="logo">
                        <Link to="/" className="Home">Tv Watchlist App</Link>{" "}
                    </div>
                    <div className="links">
                        <Link to="/users">Users</Link>{" "}
                        <Link to="/shows">Shows</Link>{" "}
                        <Link to="/about">About</Link>{" "}
                    </div>
                </div>
                <div>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path="/users" component={Users} />
                        <Route path="/shows" component={Shows} />
                        <Route path="/about" component={About} />
                    </Switch>
                </div>
            </div>
        )
    }
}
export default NavBar;