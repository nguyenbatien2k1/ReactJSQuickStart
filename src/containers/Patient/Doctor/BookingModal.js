import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "./BookingModal.scss";

import { LANGUAGES } from "../../../utils";
import ProfileDoctor from "./ProfileDoctor";

import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { userService } from "../../../services";

class BookingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailDoctor: {},
    };
  }

  async componentDidMount() {
    let res = await this.getDataProfileDoctor(this.props.match.params.doctorId);
    this.setState({
      detailDoctor: res
    })
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.language !== this.props.language) {
      let res = await this.getDataProfileDoctor(this.props.match.params.doctorId);
      this.setState({
        detailDoctor: res
      })
    }
  }

  getDataProfileDoctor = async (doctorId) => {
    let result = {}
    let res = await userService.getProfileDoctorById(doctorId);

    if(res && res.errCode === 0) {
      result = res.data;
    }
    return result;
}

  handleConfirm = () => {

  }

  handleCancelOrClose = () => {
    this.props.handleCloseModal();
  }

  render() {
    let isOpenModal = this.props.isOpenModal
    let doctorId = this.props.match.params.doctorId || 0;
    let {detailDoctor} = this.state;

    let priceVi = '', priceEn = '';

    if(detailDoctor && detailDoctor.Doctor_Info && detailDoctor.Doctor_Info.priceData) {
      priceVi = `${new Intl.NumberFormat('vi-VI').format(detailDoctor.Doctor_Info.priceData.valueVi)} VNĐ`;
      priceEn = `${new Intl.NumberFormat('vi-VI').format(detailDoctor.Doctor_Info.priceData.valueEn)} USD`;
    }    

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
                    />
                  </div>
                  <span><FormattedMessage id="patient.modal.price" />: </span><span>{this.props.language === LANGUAGES.VI ? priceVi : priceEn}</span>
                  <div className="row">
                    <div className="form-group col-4">
                      <label><FormattedMessage id="patient.modal.full-name" /></label>
                      <input className="form-control" placeholder="Bắt buộc" />
                    </div>
                    <div className="form-group col-4">
                      <label>Email</label>
                      <input className="form-control" placeholder="Bắt buộc" />
                    </div>
                    <div className="form-group col-4">
                      <label><FormattedMessage id="patient.modal.phonenumber" /></label>
                      <input className="form-control" placeholder="Bắt buộc" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-4">
                      <label><FormattedMessage id="patient.modal.date-of-birth" /></label>
                      <input className="form-control" placeholder="Ngày/Tháng/Năm" />
                    </div>
                    <div className="form-group col-8">
                      <label><FormattedMessage id="patient.modal.address" /></label>
                      <input className="form-control" placeholder="Bắt buộc" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-6">
                      <label><FormattedMessage id="patient.modal.who-to-examine" /></label>
                      <textarea className="form-control" placeholder="Bắt buộc" />
                    </div>
                    <div className="form-group col-6">
                      <label><FormattedMessage id="patient.modal.reason" /></label>
                      <textarea className="form-control" placeholder="Bắt buộc" />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookingModal));
