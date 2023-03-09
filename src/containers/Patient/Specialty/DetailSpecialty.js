import React, { Component } from 'react';
import { connect } from "react-redux";

import './DetailSpecialty.scss';
import {FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { userService } from '../../../services';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import MedicalAddressDoctor from '../Doctor/MedicalAddressDoctor';
import ProfileDoctor from '../Doctor/ProfileDoctor';



class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            listDoctor: [26, 25],
        }
    }

    async componentDidMount() {
       
    }

   
    async componentDidUpdate(prevProps, prevState, snapshot) {
       if(prevProps.language !== this.props.language) {

       }
    }


    render() {

        const {listDoctor} = this.state

        return (
            <>
                <HomeHeader />
                <div className='d-s-intro'></div>
                <div className='detail-specialty-container py-3'>
                    <div className='container'>
                        {
                            listDoctor && listDoctor.length > 0 &&
                            listDoctor.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='e-d-left'>
                                        <div className='e-d-l-profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className='e-d-right'>
                                        <div className='e-d-r-doctor-schedule'>
                                            <DoctorSchedule 
                                                doctorId={item}
                                            />
                                        </div>
                                        <div className='e-d-r-medical-address'>
                                            <MedicalAddressDoctor 
                                                doctorId={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                                )
                            }) 
                        }
                    </div>           
                </div>
            </>
            
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
