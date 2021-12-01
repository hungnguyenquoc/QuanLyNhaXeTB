import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "./../../store/actions";
import './Login.scss';
import axios from 'axios';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import userService from '../../services/userService';

class Login extends Component {
    // init state
    // 
    // 
    constructor(props) {
        super(props);
        this.state = {
            username: 'ADMIN001',
            password: '0911670071',
            isShowPassword: false,
            errorMessage: '',
            loading: false
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
    handleLogin = async () => {
        this.setState({
            errorMessage: ''
        });
        try {
            let data = await userService.handleLogin(this.state.username, this.state.password);
            if(data !== null || data !== undefined) {
                this.props.userLoginSuccess(data.data);
                console.log('success', data.data);
            }
            // if(data.data.username == '' || data.data.username == undefined || data.data.username == undefined) {
            //     console.log('required')
            // }
        }
        catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message
                    });
                }
            }
            console.error(error.response);
        }
        // this.setState({
        //     errorMessage: null,
        //     loading: true
        // });
        // axios.post('http://localhost:13730/api/NhanVien/Login', {
        //     username: this.state.username, 
        //     password: this.state.password
        // }).then(response => {
        //     this.setState({loading: false});
        //     userService.setUserSession(response.data.token, response.data.username)
        //     console.log('ok',response);
        //     this.props.history.push('/HOMEd');
        // }).catch(error => {
        //     if(error.response) {
        //         if(error.response.data) {
        //             this.setState({
        //                 errorMessage: error.response.data.message
        //             });
        //             console.log('fsdfsd', error.response.data);
        //         }
        //     }
        // });
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
        
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
                        <div className="error" style={{color: 'red'}}>
                                {this.state.errorMessage}
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
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default (Login);
