import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import * as Backend from '../script/backend.js';
import * as Cookie from '../script/cookie.js';
import * as State from '../script/state.js';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: props.store
        };

        this.login = this.login.bind(this);
        this.resetInput = this.resetInput.bind(this);
        this.resetInput();
    }

    resetInput() {
        $('#appLoginUserName').val("");
        $('#appLoginPassword').val("");
    }

    login() {
        var username = $('#appLoginUserName').val();
        var password = $('#appLoginPassword').val();
        if ((username.length > 0) && 
            (password.length > 0)) {
            Backend.authenticateUser(username, password, (authorization) => {
                if (authorization !== null) {
                    Cookie.store("TOKEN", authorization);
                    Cookie.store("USER", username);
                    State.emit(this.state.store, 'LOGGED_IN', null);
                    // window.location.assign('/blogs');
                }
                else {
                    // TODO: need error handline
                    this.resetInput();
                }
            });
        }
        else {
            console.warn("Invalid Input");
            this.resetInput();
        }
    }

    render() {
        return (
            <div id="appLogin" className="container-fluid text-center">
                <div className="row content">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6 text-center">
                        <form className="w3-container">
                            <div className="form-group"></div>
                            <div className="form-group col-md-12">
                                <input type="text" className="w3-input w3-border w3-block" id="appLoginUserName" placeholder="User Name " />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="password" className="w3-input w3-border w3-block" id="appLoginPassword" placeholder="Password " />
                            </div>
                            <div className="form-group">
                                <div className="col-md-6">
                                    <Link to="/cmad-blog-project-advance/"><button type="button" className="w3-btn w3-block w3-black w3-hover-blue btn-default" id="appLoginLogin" onClick={this.login}>Login</button></Link>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/cmad-blog-project-advance/signup"><button type="button" className="w3-btn w3-block w3-black w3-hover-blue btn-default" id="appLoginSignup">Signup</button></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        );
    }
}

export default Login;