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
        this.BlogsAuthoredPage = this.BlogsAuthoredPage.bind(this);
    }

    BlogsPage() {
        return (
            <div>
                < Header store = { this.state.store } />
                < Banner store = { this.state.store } activeTab = { "All" } />
                < Pagination store = { this.state.store } />
                < Blogs store = { this.state.store } />
            </div>
        );
    }

    BlogsAuthoredPage() {
        return (
                <div>
                    < Header store = { this.state.store } />
                    < Banner store = { this.state.store } activeTab = { "Authored" } />
                    < Blogs store = { this.state.store } />
                </div>
            );        
    }

    LoginPage() {
        return (
            <div>
                < Header store = { this.state.store } />
                < Banner store = { this.state.store } activeTab = { "All" } />
                < Login store = { this.state.store } />
            </div>
        );
    }

    SignupPage() {
        return (
            <div>
                < Header store = { this.state.store } />
                < Banner store = { this.state.store } activeTab = { "All" } />
                < Signup store = { this.state.store } />
            </div>
        );
    }

    BlogWithComments() {
        return (
            <div>
                < Header store = { this.state.store } />
                < Banner store = { this.state.store } activeTab = { "All" } />
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
                < Banner store = { this.state.store } activeTab = { "All" } />
                < CreateBlog store = { this.state.store } />
            </div>
        );        
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/cmad-blog-project-advance/login" component={this.LoginPage}/>
                    <Route exact path="/cmad-blog-project-advance/signup" component={this.SignupPage}/>
                    <Route exact path="/cmad-blog-project-advance/create" component={this.CreateBlogPage}/>
                    <Route exact path="/cmad-blog-project-advance/blog" component={this.BlogWithComments}/>
                    <Route exact path="/cmad-blog-project-advance/blogs" component={this.BlogsPage}/>
                    <Route exact path="/cmad-blog-project-advance/authored" component={this.BlogsAuthoredPage}/>
                    <Route path="/" component={this.BlogsPage}/>
               </Switch>
            </Router>
        );
    }
}

export default Apps;