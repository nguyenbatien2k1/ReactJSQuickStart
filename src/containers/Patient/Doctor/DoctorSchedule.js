import React, { Component } from 'react';
import { connect } from "react-redux";

import './DoctorSchedule.scss';
import {FormattedMessage } from 'react-intl';
import moment from 'moment';
import localization from "moment/locale/vi";
import { LANGUAGES } from '../../../utils';
import { userService } from '../../../services';
import { withRouter } from 'react-router-dom';
import BookingModal from './BookingModal';
import _ from 'lodash';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
           allDays: [],
           allAvailableTime: [],
           isOpenModal: false,
           dataScheduleTime: {}
        }
    }

    async componentDidMount() {

        let allDays = this.setAllDays(this.props.language);

        if(allDays && allDays.length > 0) {
            // let doctorId = this.props.match.params.doctorId;
            let doctorId = this.props.doctorId;
            let res = await userService.getScheduleDoctorByDate(doctorId, allDays[0].value);
            if(res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data
                })
            }
        }

        this.setState({
            allDays: this.setAllDays(this.props.language)
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.language !== this.props.language) {
            this.setState({
                allDays: this.setAllDays(this.props.language)
            })
        }

        if(prevProps.doctorId !== this.props.doctorId) {
            let allDays = this.setAllDays(this.props.language);

            if(allDays && allDays.length > 0) {
                // let doctorId = this.props.match.params.doctorId;
                let doctorId = this.props.doctorId;
                let res = await userService.getScheduleDoctorByDate(doctorId, allDays[0].value);
                if(res && res.errCode === 0) {
                    this.setState({
                        allAvailableTime: res.data
                    })
                }
            }

            this.setState({
                allDays: this.setAllDays(this.props.language)
            })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setAllDays = (language) => {
        
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if(i === 0) {
                if(language === LANGUAGES.VI) {
                    object.label = `Hôm nay - ${moment(new Date()).format('DD/MM')}`
                }
                else {
                    object.label = `Today - ${moment(new Date()).format('DD/MM')}` 
                }
            }
            else {
                if(language === LANGUAGES.VI) {
                    object.label = this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'));
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').format('DD/MM/YYYY');
            
            allDays.push(object)
        }

        return allDays;
    }

    handleOnChangeSelect = async (e) => {
        let doctorId = this.props.doctorId;
        let date = e.target.value;
        let res = await userService.getScheduleDoctorByDate(doctorId, date);
        if(res && res.errCode === 0) {
            this.setState({
                allAvailableTime: res.data
            })
        }
    }

    handleClickTime = (time) => { 
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            dataScheduleTime: time
        })
    }

    handleCloseModal = () => {
        this.setState({
            isOpenModal: false
        })
    }

    render() {

        const {allDays, allAvailableTime, isOpenModal, dataScheduleTime} = this.state;
        let {language} = this.props;

        return (
            <>     
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select
                        onChange={(e) => this.handleOnChangeSelect(e)}
                    >
                        {
                            allDays && allDays.length > 0 &&
                            allDays.map((item, index) => {
                                return (
                                    <option 
                                        key={index} 
                                        value={item.value}
                                    >
                                        {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar my-3'>
                            <i className="fas fa-calendar-alt"><span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>
                    </div>
                    <div className='time-content'>
                        {
                            allAvailableTime && allAvailableTime.length > 0 ?
                            <>
                            {
                                allAvailableTime.map((item, index) => {
                                    let time = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return (
                                        <button 
                                            key={index}
                                            onClick={() => this.handleClickTime(item)}
                                        >{time}</button>
                                    )
                                })
                            }
                            <div className='book-free'><FormattedMessage id="patient.detail-doctor.book-free" /> <i className="far fa-hand-point-up"></i></div>
                            </>
                            : <div><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                        }
                    </div>
                </div>
            </div>
            {
                dataScheduleTime && !_.isEmpty(dataScheduleTime) &&
                <BookingModal
                    isOpenModal={isOpenModal}
                    handleCloseModal={this.handleCloseModal}
                    dataScheduleTime={dataScheduleTime}
                    priceData={this.props.priceData}
                    doctorId={this.props.doctorId}
                />
            }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));
