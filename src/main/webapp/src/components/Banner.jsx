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
                <Link to="/create"><button type="button" className="w3-btn w3-block w3-hover-blue btn-default" id="appBannerCreate">Create</button></Link>
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
        console.warn("Render Active " + title)
        return (
            <li><div className="w3-btn w3-block w3-black w3-hover-black btn-default">{title}</div></li>
        );
    }

    renderTabInactive(title) {
        console.warn("Render Inactive " + title)
        return (
            <li><div className="w3-btn w3-block w3-hover-black btn-default">{title}</div></li>
        );
    }

    renderTabs() {
        var tabs = ['All', 'Authored', 'Commented'];

        if (State.get(this.state.store) === State.LoggedIn) {
            return (
                <ul className="nav nav-tabs">
                    { tabs.map((tab, index) => { 
                        if (tab === this.state.tab) {
                            this.renderTabActive(tab)
                        }
                        else {
                            this.renderTabInactive(tab) 
                        }
                    }
                    ) }
                </ul>
            );
        }
        else {
            return (
                <ul className="nav nav-tabs">
                    { tabs.map((tab, index) => { (tab === this.state.tab)?this.renderTabActive(tab):this.renderTabInactive(tab) }) }
                </ul>
            );
        }    
    }

    render() {
        return (
            <div id="appBanner" className="panel panel-default">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="col-md-6">
                            {this.renderCreate()}
                        </div>
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