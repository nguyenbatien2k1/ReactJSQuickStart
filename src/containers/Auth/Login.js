import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
        }
    }

    handleEventChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    } 

    handleEventLogin = (e) => {
        console.log('username: ', this.state.username, ' ; password: ', this.state.password)
    }

    handleEventShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
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
                                    type={this.state.isShowPassword ? 'text' : 'password'} 
                                    className='form-control' 
                                    id='password' 
                                    name='password'
                                    placeholder='Enter your password...'
                                    value={this.state.password}
                                    onChange={(e) => this.handleEventChangeInput(e)}
                                />
                                <span
                                    onClick={() => this.handleEventShowHidePassword()}
                                >
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>  
                                </span>
                            </div>
                        </div>

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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
