import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "./BookingModal.scss";

import { LANGUAGES } from "../../../utils";
import ProfileDoctor from "./ProfileDoctor";

import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { userService } from "../../../services";

import DatePicker from '../../../components/Input/DatePicker';
import * as actions from '../../../store/actions';
import Select from "react-select";
import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi";



class BookingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailDoctor: {},
      fullname: '',
      email: '',
      phonenumber: '',
      date: this.props.dataScheduleTime.date,

      genders: '',
      selectedGender: '',

      address: '',
      reason: '',
      // price: this.props.language === LANGUAGES.VI ? this.props.priceData.valueVi : this.props.priceData.valueEn,
      price: this.buildPrice(this.props.priceData),
      doctorId: this.props.match.params.doctorId,
      doctorName: '',

      timeType: this.props.dataScheduleTime.timeType,

      timeVi: '',
      timeEn: ''

    };
  }

  async componentDidMount() {
    let res = await this.getDataProfileDoctor(this.props.match.params.doctorId);

    this.props.getGender();
    
    this.setState({
      detailDoctor: res,
      timeVi: this.formatTimeMoment().timeVi,
      timeEn: this.formatTimeMoment().timeEn,
    })

  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.language !== this.props.language) {
      let res = await this.getDataProfileDoctor(this.props.match.params.doctorId);
      this.setState({
        detailDoctor: res,
        genders: this.buildDataGenders(this.props.genders)
      })
    }

    if(prevProps.genders !== this.props.genders) {
        this.setState({
          genders: this.buildDataGenders(this.props.genders)
        })
    }

    if(prevProps.dataScheduleTime !== this.props.dataScheduleTime) {
      this.setState({
        timeVi: this.formatTimeMoment().timeVi,
        timeEn: this.formatTimeMoment().timeEn
      })
    }
  }

  formatTimeMoment = () => {
    let timeVi = '', timeEn = '';
    let {dataScheduleTime, language} = this.props;

    if(dataScheduleTime && dataScheduleTime.timeTypeData) {
      let dateVi = this.capitalizeFirstLetter(moment(moment(dataScheduleTime.date, 'DD/MM/YYYY')).format('dddd - DD/MM/YYYY'));
      let dateEn = moment(moment(dataScheduleTime.date, 'DD/MM/YYYY')).locale('en').format('ddd - MM/DD/YYYY');
      
      timeVi = `${dataScheduleTime.timeTypeData.valueVi} - ${dateVi}`;
      timeEn = `${dataScheduleTime.timeTypeData.valueEn} - ${dateEn}`;
    }

    return {
      timeVi,
      timeEn
    }
  }

  buildDataGenders = (data) => {
    let result = [];
    let {language} = this.props
    if(data && data.length > 0) {
      data.map(item => {
        result.push({
          label: language === LANGUAGES.VI ? item.valueVi : item.valueEn,
          value: item.key
        })
      })
    }
    return result;
  }

  handleChange = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption
    })
  }

  getDataProfileDoctor = async (doctorId) => {
    let result = {}
    let res = await userService.getProfileDoctorById(doctorId);

    if(res && res.errCode === 0) {
      result = res.data;
    }
    return result;
  }

  checkValidateInput(data) {
    if(!Object.keys(data).length) return false;
    else {
        for (let i = 0; i < Object.keys(data).length; i++) {
            if(!Object.values(data)[i]) return false;
            if(Object.keys(data)[i] === 'email') {
              let validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if(!validRegex.test(Object.values(data)[i])) return false;
            }
            else if(Object.keys(data)[i] === 'phonenumber') {
              let validPhone = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
              if(!validPhone.test(Object.values(data)[i])) return false;
            }
        }
    }
    return true;
  }

  buildDoctorName = (dataScheduleTime) => {
    let language = this.props.language;
    let nameDoctorVi = `${dataScheduleTime.doctorData.lastName} ${dataScheduleTime.doctorData.firstName}`;
    let nameDoctorEn = `${dataScheduleTime.doctorData.firstName} ${dataScheduleTime.doctorData.lastName}`;
    return language === LANGUAGES.VI ? nameDoctorVi : nameDoctorEn;
  }

  handleConfirm = async () => {

    let data = {
      doctorId: this.state.doctorId,
      doctorName: this.buildDoctorName(this.props.dataScheduleTime),
      fullname: this.state.fullname,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      date: this.state.date,
      selectedGender: this.state.selectedGender.value,
      address: this.state.address,
      reason: this.state.reason,
      price: this.state.price,
      timeType: this.state.timeType,
      timeVi: this.state.timeVi,
      timeEn: this.state.timeEn,
      language: this.props.language
    }    
    
    if(this.checkValidateInput(data)) {      
      let res = await userService.postBookAppointment(data);
      if(res && res.errCode === 0) {
        toast.success('Booking Appointment Success!')
        this.props.handleCloseModal();
      }
      else {
        toast.error('Booking Appointment Failed!')
      }
    }
    else {
      toast.error('Booking Appointment Failed!')
    }
  }

  handleCancelOrClose = () => {
    this.props.handleCloseModal();
  }

  handleChangeInput = (e, id) => {
    let copyState = {
      ...this.state
    }
    copyState[id] = e.target.value
    this.setState({
      ...copyState
    })
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  buildPrice = (priceData) => {
    let priceVi = '', priceEn = '';
    let {language} = this.props;
    if(priceData) {
      priceVi = `${new Intl.NumberFormat('vi-VI').format(priceData.valueVi)} VNĐ`;
      priceEn = `${new Intl.NumberFormat('vi-VI').format(priceData.valueEn)} USD`;
    }

    return language === LANGUAGES.VI ? priceVi : priceEn;
  }

  render() {
    let isOpenModal = this.props.isOpenModal
    let doctorId = this.props.match.params.doctorId || 0;

    return (
            <Modal 
                isOpen={isOpenModal} 
                className="booking-modal-container"
                size="lg"
                centered
            >
              <div className="booking-modal-content">

                <div className="booking-modal-header">
                    <span className="left"><FormattedMessage id="patient.modal.message-info" /></span>
                    <span 
                        className="right"
                        onClick={() => this.handleCancelOrClose()}
                    ><i className="fas fa-times"></i></span>
                </div>

                <div className="booking-modal-body">
                  <div className="doctor-info">
                    <ProfileDoctor
                        doctorId={doctorId}
                        dataScheduleTime={this.props.dataScheduleTime}
                        formatTimeMoment={this.formatTimeMoment}
                    />
                  </div>
                  {/* <span><FormattedMessage id="patient.modal.price" />: </span><span>{this.props.language === LANGUAGES.VI ? priceVi : priceEn}</span> */}
                  <div className="row">
                    <div className="form-group col-4">
                      <label><FormattedMessage id="patient.modal.full-name" /></label>
                      <input 
                          className="form-control" 
                          value={this.state.fullname}
                          placeholder="Bắt buộc" 
                          onChange={(e) => this.handleChangeInput(e, 'fullname')}
                          />
                    </div>
                    <div className="form-group col-4">
                      <label>Email</label>
                      <input className="form-control" placeholder="Bắt buộc" 
                      value={this.state.email}
                      onChange={(e) => this.handleChangeInput(e, 'email')}
                      />
                    </div>
                    <div className="form-group col-4">
                      <label><FormattedMessage id="patient.modal.phonenumber" /></label>
                      <input className="form-control" placeholder="Bắt buộc" 
                      value={this.state.phonenumber}
                      onChange={(e) => this.handleChangeInput(e, 'phonenumber')}
                      />
                    </div>
                  </div>
                  <div className="row">
                    
                    <div className="form-group col-3">
                      <label><FormattedMessage id="patient.modal.gender" /></label>     
                      <Select
                          value={this.state.selectedGender}
                          options={this.state.genders}
                          placeholder={<FormattedMessage id="patient.modal.gender" />}
                          onChange={this.handleChange}

                      />
                    </div>
                    
                    <div className="form-group col-4">
                      <label><FormattedMessage id="patient.modal.address" /></label>
                      <textarea className="form-control" placeholder="Bắt buộc" 
                      value={this.state.address}
                      onChange={(e) => this.handleChangeInput(e, 'address')}
                      />
                    </div>

                    <div className="form-group col-5">
                      <label><FormattedMessage id="patient.modal.reason" /></label>
                      <textarea className="form-control" placeholder="Bắt buộc" 
                      value={this.state.reason}
                      onChange={(e) => this.handleChangeInput(e, 'reason')}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-5">
                      <label><FormattedMessage id="patient.modal.date" /></label>
                      <input className="form-control" placeholder="Ngày khám" 
                        value={this.props.language === LANGUAGES.VI ? this.state.timeVi : this.state.timeEn}
                        onChange={(e) => this.handleChangeInput(e, 'date')}
                        disabled
                      />
                    </div>
                    <div className="form-group col-3">
                      <label><FormattedMessage id="patient.modal.price" /></label>
                      <input className="form-control"
                        value={this.state.price}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="booking-modal-footer">
                  <button 
                      className="btn btn-secondary btn-confirm"
                      onClick={() => this.handleCancelOrClose()}
                  >
                    <FormattedMessage id="patient.modal.cancel" />
                  </button>
                  <button 
                      className="btn btn-primary btn-cancel"
                      onClick={() => this.handleConfirm()}
                  >
                    <FormattedMessage id="patient.modal.confirm" />
                  </button>
                </div>
              </div>
            </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingModal));
