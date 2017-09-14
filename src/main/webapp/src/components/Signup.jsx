import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import * as Backend from '../script/backend.js';
import * as Cookie from '../script/cookie.js';
import * as State from '../script/state.js';

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            store: props.store
        };
        
        this.signup = this.signup.bind(this);
        this.resetInput = this.resetInput.bind(this);
        this.resetInput();
    }

	resetInput() {
        $('#appSignupFirstName').val("");
        $('#appSignupLastName').val("");
        $('#appSignupEMail').val("");
        $('#appSignupUserName').val("");
        $('#appSignupPassword').val("");
    }
    
	signup() {
		var signupFirstName = $('#appSignupFirstName').val();
        var signupLastName = $('#appSignupLastName').val();
        var signupEMail = $('#appSignupEMail').val();
        var signupUserName = $('#appSignupUserName').val();
        var signupPassword = $('#appSignupPassword').val();
        if ((signupFirstName.length > 0) && 
            (signupPassword.length > 0)){
            Backend.signupUser(signupFirstName, signupLastName, signupEMail, signupUserName, signupPassword, (authorization) => {
                if (authorization !== null) {
                    Cookie.store("TOKEN", authorization);
                    Cookie.store("USER", signupUserName);
                    State.emit(this.state.store, 'LOGGED_IN', null);
                }
                else {
                    // TODO: need error handline
                    this.resetInput();
                }
            });
        }else{
            this.resetInput();
        }
	}
	
    render() {
        return (
            <div id="appSignup" className="container-fluid text-center">
                <div className="row content">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6 text-center">
                        <form className="w3-container">
                            <div className="form-group"></div>
                            <div className="form-group col-md-12">
                                <input type="text" className="w3-input w3-border w3-block" id="appSignupFirstName" placeholder="First Name " />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="text" className="w3-input w3-border w3-block" id="appSignupLastName" placeholder="Last Name " />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="text" className="w3-input w3-border w3-block" id="appSignupEMail" placeholder="EMail " />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="text" className="w3-input w3-border w3-block" id="appSignupUserName" placeholder="User Name " />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="password " className="w3-input w3-border w3-block" id="appSignupPassword" placeholder="Password " />
                            </div>
                            <div className="form-group">
                                <div className="col-md-6">
                                    <Link to="/cmad-blog-project-advance/"><button type="button" className="w3-btn w3-block w3-black w3-hover-blue btn-default" id="appSignupCreate" onClick={() => {this.signup()}}>Create</button></Link>
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="w3-btn w3-block w3-black w3-hover-blue btn-default" id="appSignupLogin" onClick={() => this.resetInput()}>Cancel</button>
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

export default Signup;