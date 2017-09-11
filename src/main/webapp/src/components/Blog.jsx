import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import * as Backend from '../script/backend.js';
import * as Cookie from '../script/cookie.js';
import * as State from '../script/state.js';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        // TODO: set the delete button depending on input authorization code
        this.props = props;
        this.state = {
            store: props.store,
            blog: {}
        };
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
        this.renderBlog = this.renderBlog.bind(this);
        this.renderCommentCount = this.renderCommentCount.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
        this.renderUpvote = this.renderUpvote.bind(this);
        this.renderDownvote = this.renderDownvote.bind(this);

        var query = require('query-string').parse(location.search);
        Backend.getBlog(query.blogId, (blog) => {
            this.setState({
                blog: blog
            });
        });
    }

    renderDelete(blog) {
        if (State.get(this.state.store) === State.LoggedIn) {
            return (
                <button type="button" className="w3-btn w3-block w3-light-gray w3-hover-blue btn-default" id="appBlogsDelete{index}">Delete</button>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    renderUpvote(blog) {
        if (State.get(this.state.store) === State.LoggedIn) {
            return (
                <button type="button" className="w3-btn w3-block w3-light-gray w3-hover-blue"><span className="glyphicon glyphicon-thumbs-up"></span> <span className="badge" onClick={() => this.upvote(blog.blogId)}>{blog.upVote}</span></button>
            );
        }
        else {
            return (
                <button type="button" className="w3-button w3-block w3-light-gray w3-hover-light-gray"><span className="glyphicon glyphicon-thumbs-up"></span> <span className="badge">{blog.upVote}</span></button>
            );
        }
    }

    renderDownvote(blog) {
        if (State.get(this.state.store) === State.LoggedIn) {
            return (
                <button type="button" className="w3-btn w3-block w3-light-gray w3-hover-blue"><span className="glyphicon glyphicon-thumbs-down"></span> <span className="badge" onClick={() => this.downvote(blog.blogId)}>{blog.downVote}</span></button>
            );
        }
        else {
            return (
                <button type="button" className="w3-button w3-block w3-light-gray w3-hover-light-gray"><span className="glyphicon glyphicon-thumbs-down"></span> <span className="badge">{blog.downVote}</span></button>
            );
        }
    }

    renderCommentCount(blog) {
        if (typeof(blog.comments) === "number") {
            return (
                <button type="button" className="w3-button w3-block w3-light-gray w3-hover-light-gray">Comments <span className="badge">{blog.comments}</span></button>
            );
        }
        else {
            return (
                <button type="button" className="w3-button w3-block w3-light-gray w3-hover-light-gray">Comments <span className="badge">0</span></button>
            );
        }
    }

    upvote(blogId) {
        Backend.upvoteBlog(blogId, Cookie.get('TOKEN'), (status) => {
            Backend.getBlog(blogId, (blog) => {
                this.setState({
                    blog: blog
                });
            });
        });
    }

    downvote(blogId) {
        Backend.downvoteBlog(blogId, Cookie.get('TOKEN'), (status) => {
            Backend.getBlog(blogId, (blog) => {
                this.setState({
                    blog: blog
                });
            });
        });
    }

    renderBlog(blog) {
        return (
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="w3-card-4">
                        <header className="w3-container w3-gray text-center">
                            <h1><b>{blog.title}</b></h1>
                            <h6>Posted by <i><b>{blog.author}</b></i> on <i>{Date(blog.lastUpdatedOn)}</i></h6>
                        </header>

                        <div className="w3-container text-justify blog-content">
                            {blog.blogContent}
                        </div>

                        <footer className="w3-container w3-light-gray">
                            <div className="row">
                                <div className="col-md-6">
                                    {this.renderDelete(blog)}
                                </div>
                                <div className="col-md-2">
                                    {this.renderCommentCount(blog)}
                                </div>
                                <div className="col-md-2">
                                    {this.renderUpvote(blog)}
                                </div>
                                <div className="col-md-2">
                                    {this.renderDownvote(blog)}
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
            <div id="appBlog">
                {this.renderBlog(this.state.blog)}
            </div>
        );
    }
}

export default Blog;