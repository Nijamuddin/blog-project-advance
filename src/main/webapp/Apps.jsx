import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import * as Backend from './src/script/backend.js';
import * as Cookie from './src/script/cookie.js';
import * as State from './src/script/state.js';

import Header from './src/components/Header.jsx';
import Blogs from './src/components/Blogs.jsx';
import Banner from './src/components/Banner.jsx';
import Login from './src/components/Login.jsx';
import Signup from './src/components/Signup.jsx';
import Blog from './src/components/Blog.jsx';
import Comments from './src/components/Comments.jsx';
import CreateBlog from './src/components/CreateBlog.jsx';
import CreateComment from './src/components/CreateComment.jsx';
import Pagination from './src/components/Pagination.jsx';

class Apps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: props.store
        };
        this.SignupPage = this.SignupPage.bind(this);
        this.BlogsPage = this.BlogsPage.bind(this);
        this.LoginPage = this.LoginPage.bind(this);
        this.BlogWithComments = this.BlogWithComments.bind(this);
        this.CreateBlogPage = this.CreateBlogPage.bind(this);
    }

    BlogsPage() {
        return (
            <div>
                < Header store = { this.state.store } />
                < Banner store = { this.state.store } />
                < Pagination store = { this.state.store } />
                < Blogs store = { this.state.store } />
            </div>
        );
    }

    LoginPage() {
        return (
            <div>
                < Header store = { this.state.store } />
                < Banner store = { this.state.store } />
                < Login store = { this.state.store } />
            </div>
        );
    }

    SignupPage() {
        return (
            <div>
                < Header store = { this.state.store } />
                < Banner store = { this.state.store } />
                < Signup store = { this.state.store } />
            </div>
        );
    }

    BlogWithComments() {
        return (
            <div>
                < Header store = { this.state.store } />
                < Banner store = { this.state.store } />
                < Blog store = { this.state.store } />
                < Comments store = { this.state.store } />
                < CreateComment store = { this.state.store } />
            </div>
        );
    }

    CreateBlogPage() {
        return (
            <div>
                < Header store = { this.state.store } />
                < Banner store = { this.state.store } />
                < CreateBlog store = { this.state.store } />
            </div>
        );        
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={this.LoginPage}/>
                    <Route exact path="/signup" component={this.SignupPage}/>
                    <Route exact path="/create" component={this.CreateBlogPage}/>
                    <Route exact path="/blog" component={this.BlogWithComments}/>
                    <Route exact path="/blogs" component={this.BlogsPage}/>
                    <Route path="/" component={this.BlogsPage}/>
               </Switch>
            </Router>
        );
    }
}

export default Apps;