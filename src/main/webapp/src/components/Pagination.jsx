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
    }

    render() {
        return (
            <div id="appFooter" className="row">
                <div className="col-md-2"></div>
                <div className="col-md-1 .text-justify">
                    <button type="button" className="w3-btn w3-block w3-hover-white btn-default" href="#">❮ Previous</button>
                </div>
                <div className="col-md-6"></div>
                <div className="col-md-1 .text-justify">
                    <button type="button" className="w3-btn w3-block w3-hover-white btn-default" href="#">Next ❯</button>
                </div>
                <div className="col-md-2"></div>
            </div>
        );
    }
}

export default Pagination;