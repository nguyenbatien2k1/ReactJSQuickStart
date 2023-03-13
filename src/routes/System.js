import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import { USER_ROLE } from '../utils';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import ManageHandBook from '../containers/System/Handbook/ManageHandBook';

class System extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            roleShow: false,
        }
    }
    
    componentDidMount() {
        const { isLoggedIn, userInfo } = this.props;
        if(isLoggedIn && userInfo.roleId === USER_ROLE.ADMIN) {
            this.setState({
                roleShow: true,
            })
        } 
    }

    render() {
        const { systemMenuPath, isLoggedIn, userInfo } = this.props;

        return (

            <>
            {
                this.state.roleShow ? 
                <>
                    <Header />
                            <div className="system-container">
                                <div className="system-list">
                                    <Switch>
                                        <Route path="/system/user-manage" component={UserManage} />
                                        <Route path="/system/crud-redux" component={UserRedux} />
                                        <Route path="/system/manage-doctor" component={ManageDoctor} />
                                        <Route path="/system/manage-specialty" component={ManageSpecialty} />
                                        <Route path="/system/manage-clinic" component={ManageClinic} />
                                        <Route path="/system/manage-handbook" component={ManageHandBook} />
                                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
