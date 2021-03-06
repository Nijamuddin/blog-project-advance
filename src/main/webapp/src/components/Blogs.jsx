import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import * as Backend from '../script/backend.js';
import * as Cookie from '../script/cookie.js';
import * as State from '../script/state.js';

class Blogs extends React.Component {
    constructor(props) {
        super(props);
        // TODO: set the delete button depending on input authorization code
        this.state = {
            store: props.store,
            blogs: [],
            offset: 0,
            category: ""
        };
        this.renderBlog = this.renderBlog.bind(this);
        this.renderCommentCount = this.renderCommentCount.bind(this);
        this.renderUpvote = this.renderUpvote.bind(this);
        this.renderDownvote = this.renderDownvote.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);

        if (location.toString().endsWith("authored") === true) {
            Backend.getBlogsAuthored(Cookie.get('USER'),(blogs) => {
                this.setState({
                    offset: 0,
                    category: "",
                    blogs: blogs
                });
            });
        }
        else {
            Backend.getBlogs(0, (blogs) => {
                this.setState({
                    offset: 0,
                    category: "",
                    blogs: blogs
                });
            });            
        }
    }

    componentDidUpdate(prevProps, prevState) {
        var query = require('query-string').parse(location.search);
        if (query.category !== undefined) {
            this.state.category = query.category;
        }
        else {
            this.state.category = "";
        }

        if ((prevState.offset !== query.offset) && (query.offset !== undefined)) {
            if (this.state.category === "") {
                Backend.getBlogs(query.offset, (blogs) => {
                    this.setState({
                        offset: query.offset,
                        category: "",
                        blogs: blogs
                    });
                });
            }
            else {
                Backend.getBlogsWithCategory(query.category, query.offset, (blogs) => {
                    this.setState({
                        offset: query.offset,
                        category: this.state.category,
                        blogs: blogs
                    });
                });
            }
        }
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
        var query = require('query-string').parse(location.search);
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
        var query = require('query-string').parse(location.search);
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
            Backend.getBlogs(this.state.offset, (blogs) => {
                this.setState({
                    offset: this.state.offset,
                    category: this.state.category,
                    blogs: blogs
                });
            });
        });
    }

    downvote(blogId) {
        Backend.downvoteBlog(blogId, Cookie.get('TOKEN'), (status) => {
            Backend.getBlogs(this.state.offset, (blogs) => {
                this.setState({
                    offset: this.state.offset,
                    category: this.state.category,
                    blogs: blogs
                });
            });
        });
    }

    renderBlog(blog, index) {
        return (
            <div key={index} className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="w3-card-4">
                        <header className="w3-container w3-gray text-center">
                            <h1><b>{blog.title}</b></h1>
                            <h6>Posted by <i><b>{blog.author}</b></i> on <i>{Date(blog.lastUpdatedOn)}</i></h6>
                        </header>

                        <Link to={`/cmad-blog-project-advance/blog?blogId=${blog.blogId}`}>
                        <div className="w3-container text-justify blogs-content">
                            {blog.blogContent}
                        </div>
                        </Link>

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
            <div id="appBlogs">
                {this.state.blogs.map((blog, index) => this.renderBlog(blog, index))}
            </div>
        );
    }
}

export default Blogs;