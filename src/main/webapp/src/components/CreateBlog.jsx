import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class CreateBlog extends React.Component {
    render() {
        return (
            <div id="appCreateBlog" className="container-fluid text-center">
                <div className="row content">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-10 text-center">
                        <form className="w3-container">
                            <div className="form-group"></div>
                            <div className="form-group col-md-12 w3-left-align">
                                <label htmlFor="appCreateBlogTitle">Title:</label>
                                <input type="text" className="form-control" id="appCreateBlogTitle"></input>
                            </div>
                            <div className="form-group col-md-12 w3-left-align">
                                <label htmlFor="appCreateBlogContent">Content:</label>
                                <textarea className="form-control" rows="12" id="appCreateBlogContent"></textarea>
                            </div>
                            <div className="form-group">
                                <div className="col-md-6">
                                    <button type="button" className="w3-btn w3-block w3-black w3-hover-blue btn-default" id="appCreateBlogCreate">Create</button>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/"><button type="button" className="w3-btn w3-block w3-black w3-hover-blue btn-default" id="appCreateBlogCancel">Cancel</button></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-1"></div>
                </div>
            </div>
        );
    }
}

export default CreateBlog;