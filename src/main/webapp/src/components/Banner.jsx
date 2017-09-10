import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import * as Backend from '../script/backend.js';
import * as Cookie from '../script/cookie.js';
import * as State from '../script/state.js';

class Banner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            store: props.store,
            tab: 'All'
        };
        this.renderCreate = this.renderCreate.bind(this);
        this.renderTabActive = this.renderTabActive.bind(this);
        this.renderTabInactive = this.renderTabInactive.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
    }

    renderCreate() {
        if (State.get(this.state.store) === State.LoggedIn) {
            return (
                <Link to="/cmad-blog-project-advance/create"><button type="button" className="w3-btn w3-hover-black btn-default" id="appBannerCreate">Create</button></Link>
            );
        }
        else {
            return (
                <div>
                </div>
            );
        }
    }

    renderTabActive(title) {
        return (
            <li><div className="w3-btn w3-block w3-black w3-hover-black btn-default">{title}</div></li>
        );
    }

    renderTabInactive(title) {
        return (
            <li><div className="w3-btn w3-block w3-hover-black btn-default">{title}</div></li>
        );
    }

    renderTabs() {
        if (State.get(this.state.store) === State.LoggedIn) {
            return (
                <ul className="nav nav-tabs">
                    {this.renderTabActive('All')}
                    {this.renderTabInactive('Authored')}
                    {this.renderTabInactive('Commented')}
                </ul>
            );
        }
        else {
            return (
                <ul className="nav nav-tabs">
                    {this.renderTabActive('All')}
                </ul>
            );
        }    
    }

    render() {
        return (
            <div id="appBanner" className="panel panel-default">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="col-md-3">
                            {this.renderCreate()}
                        </div>
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            {this.renderTabs()}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Banner;