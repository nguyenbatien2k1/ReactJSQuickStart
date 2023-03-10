import React, { Component } from 'react';
import { connect } from "react-redux";

import './MedicalAddressDoctor.scss';
import {FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { userService } from '../../../services';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';

class MedicalAddressDoctor extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          isShowDetail: false,
          price: '',
          payment: '',
          province: '',
          nameClinic: '',
          addressClinic: '',
          note: ''
        }
    }

    async componentDidMount() {
        this.getDataFromAPI();
    }

    getDataFromAPI = async () => {
        let doctorId = this.props.doctorId;
        let {language} = this.props;
        
        let res = await userService.getMedicalAddressDoctorById(doctorId);

        if(res && res.errCode === 0 && !_.isEmpty(res) && !_.isEmpty(res.data)) {
            this.setState({
                nameClinic: res.data.nameClinic,
                addressClinic: res.data.addressClinic,
                note: res.data.note,
                price: language === LANGUAGES.VI ? `${new Intl.NumberFormat('vi-VI').format(res.data.priceData.valueVi)} VNĐ` : `${new Intl.NumberFormat('en-EN').format(res.data.priceData.valueEn)} USD`,
                payment: language === LANGUAGES.VI ? res.data.paymentData.valueVi : res.data.paymentData.valueEn,
                province: language === LANGUAGES.VI ? res.data.provinceData.valueVi : res.data.provinceData.valueEn,
            })

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
       if(prevProps.language !== this.props.language) {
        this.getDataFromAPI();
       }

       if(prevProps.doctorId !== this.props.doctorId) {
        this.getDataFromAPI();
       }
    }

    handleShowHide = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail
        })
    }

    render() {

        const {isShowDetail, nameClinic, addressClinic, note, price, payment, province} = this.state;

        return (
           <div className='medical-address-container'>
                <div className='content-up'>
                    <div className='text-title mb-2'><FormattedMessage id="patient.medical-address-doctor.text-address" /></div>
                    <div className='text-clinic'>{nameClinic ? nameClinic : ''}</div>
                    <div className='text-address'>{addressClinic ? addressClinic : ''}</div>
                </div>
                <div className='content-down'>
                    {
                        isShowDetail === false ?
                        <div>
                            <span className='text-title'><FormattedMessage id="patient.medical-address-doctor.text-price" />: </span>
                            <span style={{fontSize: '16px'}}>{price}. </span>
                            <span className='see-detail' onClick={(e) => this.handleShowHide(e)}><FormattedMessage id="patient.medical-address-doctor.see-detail" /></span>
                        </div> :
                        <>
                            <div className='text-title'><FormattedMessage id="patient.medical-address-doctor.text-price" /></div>
                            <div className='c-d-table my-3'>
                                <div>
                                    <div className='text-price mb-1'>
                                        <span><FormattedMessage id="patient.medical-address-doctor.text-price" /></span>
                                        <span>{price ? price : ''}</span>
                                    </div>
                                    <div className='text-note'>{note ? note : ''}.</div>
                                </div>
                                <div className='text-payment mt-1'><FormattedMessage id="patient.medical-address-doctor.text-payment" /> {payment}</div>
                            </div>
                                <span
                                    className='hide-price-list'
                                    onClick={(e) => this.handleShowHide(e)}
                                ><FormattedMessage id="patient.medical-address-doctor.hide-price-list" /></span>
                        </>
                    }
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalAddressDoctor));
