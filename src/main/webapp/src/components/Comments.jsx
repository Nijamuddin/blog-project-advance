import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import * as Backend from '../script/backend.js';
import * as Cookie from '../script/cookie.js';
import * as State from '../script/state.js';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        // TODO: the comments shall come in from the input
        // TODO: set the delete button depending on input authorization code
        this.state = {
            store: props.store,
            commentlist: []
        };
        this.renderComment = this.renderComment.bind(this);
        this.renderDelete = this.renderDelete.bind(this);

        var query = require('query-string').parse(location.search);
        Backend.getComments(query.blogId, (comments) => {
            this.setState({
                commentlist: comments
            });
        });
    }

    renderDelete(blog) {
        if (State.get(this.state.store) === State.LoggedIn) {
            return (
                <button type="button" className="w3-btn w3-block w3-light-gray w3-hover-blue btn-default" id="appCommentsDelete{index}">Delete</button>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    renderComment(comment, index) {
        return (
            <div key={index} className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="w3-card-4">
                        <div className="w3-container text-justify">
                            <h6>Posted by <i><b>{comment.author}</b></i> on <i>{Date(comment.lastUpdatedOn)}</i></h6>
                            {comment.commentText}
                        </div>

                        <footer className="w3-container w3-light-gray">
                            <div className="row">
                                <div className="col-md-6">
                                    {this.renderDelete()}
                                </div>
                                <div className="col-md-2"></div>
                                <div className="col-md-2">
                                    <button type="button" className="w3-btn w3-block w3-light-gray w3-hover-blue"><span className="glyphicon glyphicon-thumbs-up"></span> <span className="badge">{comment.upVote}</span></button>
                                </div>
                                <div className="col-md-2">
                                    <button type="button" className="w3-btn w3-block w3-light-gray w3-hover-blue"><span className="glyphicon glyphicon-thumbs-down"></span> <span className="badge">{comment.downVote}</span></button>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
                <div className="col-md-2"></div>
                <div className="w3-panel w3-white"></div>
            </div>
        );
    }

    render() {
        return (
            <div id="appComments">
                {this.state.commentlist.map((comment, index) => this.renderComment(comment, index))}
            </div>
        );
    }
}

export default Comments;