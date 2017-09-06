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
            store: props.store,
            results: []
        };
        this.renderButton = this.renderButton.bind(this);
        this.logout = this.logout.bind(this);
        this.results = this.results.bind(this);
        this.renderSearchResults = this.renderSearchResults.bind(this);
        this.searchResult = this.searchResult.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        $("#appSearchResults").css("display","none")
    }

    searchResult(result, index) {
        var query = {
            offset: 0,
            category: result
        };

        return (
            <div key={index}>
                <Link to={Backend.getBlogUrl(query)}><div className="w3-bar-item w3-button" onClick={() => {$("#appHeaderSearch").val("")}} >{result}</div></Link>
            </div>
        );
    }

    renderSearchResults() {
        return (
            <div className="row">
                <div id="appSearchResults" className="w3-dropdown-content w3-bar-block w3-border">
                    {this.state.results.map((item, index) => this.searchResult(item, index))}
                </div> 
            </div>
        );
    }

    results() {
        Backend.filterSuggestions($('#appHeaderSearch').val(), (results) => {
            this.setState({
                results: results
            });
            $("#appSearchResults").css("display","block")
        });
    }

    logout() {
        Cookie.remove("TOKEN");
        Cookie.remove("USER");
        State.emit(this.state.store, 'LOGGED_OUT', null);
    }

    renderButton() {
        // TODO: check if cookie is available and is valid here
        //if (!Cookie.get("TOKEN") && State.get(this.state.store) !== State.LoggedIn) {
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
                        <input type="search" className="w3-input w3-animate-input w3-block w3-border-0" id="appHeaderSearch" placeholder="Search " onKeyUp={() => this.results()} />
                        {this.renderSearchResults()}
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