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
            detailSpecialty: {},
            listDoctor: [],
            listProvince: []
        }
    }

    async componentDidMount() {
       let specialtyId = this.props.match.params.specialtyId;

       let res = await userService.getDetailSpecialtyById(specialtyId, 'ALL');

       let resProvince = await userService.getAllCodeService('PROVINCE'); 

       if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
            let {listDoctor, listProvince} = this.state;

            listProvince = resProvince.data;
            
            let dataDoctor = res && !_.isEmpty(res.data) && res.data.doctorSpecialty;

            if(dataDoctor && dataDoctor.length > 0) {
                dataDoctor.map(item => {
                    listDoctor.push(item.doctorId)
                })
            }
            this.setState({
                detailSpecialty: res.data,
                listDoctor: listDoctor,
                listProvince: listProvince
            }, () => {
                console.log(this.state.listProvince)
            })
       }
    }

   
    async componentDidUpdate(prevProps, prevState, snapshot) {
       if(prevProps.language !== this.props.language) {

       }
    }

    handleOnChangeSelect = (e) => {
        console.log(e.target.value)
    }


    render() {

        const {listDoctor, detailSpecialty, listProvince} = this.state
        const {language} = this.props;


        return (
            <>
                <HomeHeader />
                <div className='d-s-intro'>
                    {
                        detailSpecialty && !_.isEmpty(detailSpecialty) &&
                        <div dangerouslySetInnerHTML={{__html: detailSpecialty.descriptionHTML}}></div>           
                    }
                </div>
                
                <div className='detail-specialty-container py-3'>
                    <div className='container'>
                        <div className='search-specialty-doctor'>
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {
                                listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option 
                                            key={index}
                                            value={item.key}
                                        >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
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
