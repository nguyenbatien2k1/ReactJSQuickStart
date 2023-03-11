import React, { Component } from 'react';
import { connect } from "react-redux";

import './DetailClinic.scss';
import {FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { userService } from '../../../services';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import HomeHeader from '../../HomePage/HomeHeader';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import MedicalAddressDoctor from '../Doctor/MedicalAddressDoctor';


class DetailClinic extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            detailClinic: {},
            listDoctor: [],
        }
    }

    async componentDidMount() {
       let clinicId = this.props.match.params.clinicId;
       let {listDoctor} = this.state;

       let res = await userService.getDetailClinicById(clinicId);

       console.log(res);

        if(res && res.errCode === 0) {
        let dataDoctor = res && !_.isEmpty(res.data) && res.data.doctorClinic;

        if(dataDoctor && dataDoctor.length > 0) {
            dataDoctor.map(item => {
                listDoctor.push(item.doctorId)
            })
        }
        this.setState({
            detailClinic: res.data,
            listDoctor: listDoctor,
        })
       }
    }

   
    async componentDidUpdate(prevProps, prevState, snapshot) {
       if(prevProps.language !== this.props.language) {

       }

    }

    render() {

        let {detailClinic, listDoctor} = this.state;
        let {language} = this.props;

        return (
           <>
                <HomeHeader />
                <div className='d-s-intro p-3'>
                        <div className='container'>
                            {
                                detailClinic && !_.isEmpty(detailClinic) &&
                                <div dangerouslySetInnerHTML={{__html: detailClinic.descriptionHTML}}></div>           
                            }
                        </div>                  
                </div>
                
                <div className='detail-specialty-container py-3'>
                    <div className='container'>
                        <div className='search-specialty-doctor'>
                        </div>
                        {
                            listDoctor && listDoctor.length > 0 ?
                            <>
                            {
                                    listDoctor && listDoctor.length > 0 &&
                                    listDoctor.map((item, index) => {
                                    return (
                                    <div className='each-doctor' key={index}>
                                        <div className='e-d-left'>
                                            <div className='e-d-l-profile-doctor'>
                                                <ProfileDoctor
                                                    doctorId={item}
                                                    isShowSeeMore={true}
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
                            </>
                            : <div className='no-data'><FormattedMessage id="manage-clinic.no-data" />...</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));
