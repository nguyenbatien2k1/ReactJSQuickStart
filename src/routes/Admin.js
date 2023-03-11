import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { USER_ROLE } from '../utils';
import _ from 'lodash';

class Admin extends Component {

    componentDidUpdate(prevProp, prevState) {
        if(prevProp.userInfo.roleId !== this.props.userInfo.roleId) {
            let link = '';
            let {userInfo} = this.props.userInfo;

            if(userInfo && !_.isEmpty(userInfo)) {
                if(userInfo.roleId === USER_ROLE.ADMIN) {
                    link = '/system/user-manage'
                }
                else if(userInfo.roleId === USER_ROLE.DOCTOR) {
                    link = '/doctor/manage-schedule'
                }
                else {
                    link = '/home'
                } 
            }

            let linkToRedirect = this.props.isLoggedIn ? link : '/home'

            return (
                <Redirect to={linkToRedirect} />
            );
        }
    }

    render() {
        const { isLoggedIn, userInfo } = this.props;
        let link = '';
        if(userInfo && !_.isEmpty(userInfo)) {
            if(userInfo.roleId === USER_ROLE.ADMIN) {
                link = '/system/user-manage'
            }
            else if(userInfo.roleId === USER_ROLE.DOCTOR) {
                link = '/doctor/manage-schedule'
            }
            else {
                link = '/home'
            } 
        }
        else {
            link = '/home'
        }

        let linkToRedirect = isLoggedIn ? link : '/home'

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
