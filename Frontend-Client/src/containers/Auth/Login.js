import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "./../../store/actions";
import './Login.scss';

class Login extends Component {
    // init state
    // 
    // 
    constructor(props) {
        super(props);
        this.state = {
            username: 'admin',
            password: 'admin',
            isShowPassword: false
        }
    }
    // handle function
    // 
    // 
    handleOnChangeInput = (event) => {
        this.setState({
            username: event.target.value,
        });
        console.log(event.target.value)
    }
    handleOnChangePassword = (event) => {
        this.setState({ 
            password: event.target.value,
        });
        console.log(event.target.value)
    }
    handleLogin = () => {
        console.log('username: ' + this.state.username, 'password: ' + this.state.password);
        console.log('all', this.state);

    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    // 
    // 
    // 
    render() {
        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <div className="form_login">
                        <h2 className="title"> </h2>

                        <div className="form-group ">
                            <input
                                placeholder=""
                                id="username"
                                name="username"
                                type="text"
                                className="form-control"
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeInput(event)}
                            />
                        </div>

                        <div id="phone-input-container" className="form-group icon-true">
                            {/* <img className="icon" alt="this" /> */}
                            <input
                                placeholder=""
                                id="password"
                                name="password"
                                type= {this.state.isShowPassword ? 'text' : 'password'}
                                className="form-control"
                                value={this.state.password} 
                                onChange={(event) => this.handleOnChangePassword(event)}
                            />
                            <span onClick={() => this.handleShowHidePassword()}>Show</span>
                        </div>


                        <div className="form-group login">
                            <input
                                id="btnLogin"
                                type="submit"
                                className="btn"
                                onClick={(event) => this.handleLogin()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default (Login);
