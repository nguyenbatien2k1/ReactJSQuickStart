import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {userService} from '../../services';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleEventChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    } 

    handleEventLogin = async () => {
        this.setState({
            errMessage: '',
        })
        try {
            let data = await userService.handleEventLogin(this.state.username, this.state.password);
                if(data && data.errCode !== 0) {
                    this.setState({
                        errMessage: data.errMessage,
                    })
                }
                else if(data && data.errCode === 0) {
                    this.props.userLoginSuccess(data.userData);
                }
        } catch (error) {
            if(error.response) {
                if(error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    })
                }
            }
        }

    }

    handleEventShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleEventKeyDown = (e) => {
        if(e.key === 'Enter' || e.keyCode === 13) {
            this.handleEventLogin();
        }
    }

    render() {
       return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center login-text'>Login</div>
                        
                        <div className='col-12 form-group login-input'>
                            <label htmlFor='username'>User name</label>
                            <input 
                                type='text' 
                                className='form-control' 
                                id='username'
                                name='username'
                                placeholder='Enter your username...'
                                value={this.state.username}
                                onChange={(e) => this.handleEventChangeInput(e)} />
                        </div>
                        
                        <div className='col-12 form-group login-input'>
                            <label htmlFor='password'>Password</label>
                            <div className='custom-input-password'>
                                <input
                                    className='form-control' 
                                    type={this.state.isShowPassword ? 'text' : 'password'} 
                                    id='password' 
                                    name='password'
                                    placeholder='Enter your password...'
                                    value={this.state.password}
                                    onChange={(e) => this.handleEventChangeInput(e)}
                                    onKeyDown={(e) => this.handleEventKeyDown(e)}
                                />
                                <span
                                    onClick={() => this.handleEventShowHidePassword()}
                                >
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>  
                                </span>
                            </div>
                        </div>

                        <div className='col-12' style={{color: "red"}}>{this.state.errMessage}</div>
                        <div className='col-12'>
                            <button 
                                className='btn-login'
                                onClick={(e) => this.handleEventLogin(e)}
                                >
                                    Login
                            </button>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>

                        <div className='col-12 text-center mt-3'>
                            <span className='other-login'>Or Login With:</span>
                        </div>

                        <div className='col-12 login-social'>
                            <i className="fab fa-facebook-f facebook"></i>
                            <i className="fab fa-google google"></i>
                        </div>
                    </div>
                </div>
            </div>
       )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
