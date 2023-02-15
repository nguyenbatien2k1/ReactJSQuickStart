import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
       return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center login-text'>Login</div>
                        
                        <div className='col-12 form-group login-input'>
                            <label htmlFor='username'>User name</label>
                            <input type='text' className='form-control' id='username' placeholder='Enter your username...' />
                        </div>
                        
                        <div className='col-12 form-group login-input'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className='form-control' id='password' placeholder='Enter your password...' />
                        </div>

                        <div className='col-12'>
                            <button className='btn-login'>Login</button>
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
