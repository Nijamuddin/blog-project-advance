import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import * as Backend from '../script/backend.js';
import * as Cookie from '../script/cookie.js';
import * as State from '../script/state.js';

class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            store: props.store
        };
        this.renderPrevious = this.renderPrevious.bind(this);
        this.renderNext = this.renderNext.bind(this);
    }

    renderPrevious() {
        var query = require('query-string').parse(location.search);
        var prevBlogUrl = Backend.getPrevBlogUrl(query);
        if (prevBlogUrl === null) {
            return (
                <button type="button" className="w3-btn w3-block w3-hover-white btn-default w3-disabled">❮ Previous</button>
            );
        }
        else {
            return (
                <Link to={prevBlogUrl}>
                    <button type="button" className="w3-btn w3-block w3-hover-white btn-default">❮ Previous</button>
                </Link>
            );
        }
    }

    renderNext() {
        var query = require('query-string').parse(location.search);
        var nextBlogUrl = Backend.getNextBlogUrl(query);
        return (
            <Link to={nextBlogUrl}>
                <button type="button" className="w3-btn w3-block w3-hover-white btn-default">Next ❯</button>
            </Link>
        );
    }

    render() {
        return (
            <div id="appFooter" className="row">
                <div className="col-md-2"></div>
                <div className="col-md-1 .text-justify">
                    {this.renderPrevious()}
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-1 .text-justify">
                    {this.renderNext()}
                </div>
                <div className="col-md-2"></div>
            </div>
        );
    }
}

export default Pagination;