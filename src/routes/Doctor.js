import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import { USER_ROLE } from '../utils';
import { withRouter } from 'react-router-dom';
import ManagePatient from '../containers/System/Doctor/ManagePatient';


class Doctor extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            roleShow: false,
        }
    }
    
    componentDidMount() {
        const { isLoggedIn, userInfo } = this.props;
        if(isLoggedIn && userInfo.roleId === USER_ROLE.DOCTOR || userInfo.roleId === USER_ROLE.ADMIN) {
            this.setState({
                roleShow: true,
            })
        }
        
    }

    render() {
        return (        
            <>
                {
                    this.state.roleShow ? 
                    <>
                        <Header />
                        <div className="system-container">
                            <div className="system-list">
                                <Switch>
                                    <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                                    <Route path="/doctor/manage-patient" component={ManagePatient} />
                                    <Route component={() => { return (<Redirect to={'/doctor/manage-schedule'} />) }} />
                                </Switch>
                            </div>
                        </div>
                    </> : ''
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
