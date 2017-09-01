import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import * as Backend from '../script/backend.js';
import * as Cookie from '../script/cookie.js';
import * as State from '../script/state.js';

class Header extends React.Component {
    constructor(props) {
        super();
        this.state = {
            store: props.store
        };
        this.renderButton = this.renderButton.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout() {
        Cookie.remove("TOKEN");
        Cookie.remove("USER");
        State.emit(this.state.store, 'LOGGED_OUT', null);
    }

    renderButton() {
        if (State.get(this.state.store) !== State.LoggedIn) {
            return (
                <Link to="/login"><button type="button" className="w3-btn w3-block w3-black w3-hover-blue btn-default" id="appHeaderLogin">Login</button></Link>
            );
        }
        else {
            return (
                <Link to="/"><button type="button" className="w3-btn w3-block w3-black w3-hover-blue btn-default" id="appHeaderLogout" onClick={this.logout}>Logout</button></Link>
            );
        }
    }

    render() {
        return (
            <div id="appHeader" className="row">
                <div className="form-group">
                    <div className="col-md-6">
                        <img id="appHeaderLogo" src="src/images/logo.png" alt="Cinque Terre">
                        </img>
                    </div>
                    <div className="col-md-4">
                        <input type="text" className="w3-input w3-border w3-block" id="appHeaderCategory" placeholder="Search " />
                    </div>
                    <div className="col-md-2">
                        {this.renderButton()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;