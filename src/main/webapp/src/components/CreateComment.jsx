import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import * as Backend from '../script/backend.js';
import * as Cookie from '../script/cookie.js';
import * as State from '../script/state.js';

class CreateComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            store: props.store
        };
    }

    render() {
        if (State.get(this.state.store) === State.LoggedIn) {
            return (
                <div id="appCreateComment" className="container-fluid text-center">
                    <div className="row content">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-8 text-center w3-left-align">
                            <div className="col-md-12">
                                <label htmlFor="appCreateCommentContent">Comment:</label>
                                <textarea className="form-control" rows="5" id="appCreateCommentContent"></textarea>
                            </div>
                            <div className="form-group col-md-12"></div>
                            <div className="col-md-6">
                                <button type="button" className="w3-btn w3-block w3-black w3-hover-blue btn-default" id="appCreateCommentPost">Post</button>
                            </div>
                            <div className="col-md-6">
                                <Link to="/cmad-blog-project-advance/"><button type="button" className="w3-btn w3-block w3-black w3-hover-blue btn-default" id="appCreateCommentCancel">Cancel</button></Link>
                            </div>
                        </div>
                        <div className="col-sm-2"></div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div id="appCreateComment">
                </div>
            );
        }
    }
}

export default CreateComment;