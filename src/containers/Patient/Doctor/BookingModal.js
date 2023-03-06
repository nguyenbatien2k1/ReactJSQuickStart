import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "./BookingModal.scss";

import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import MedicalAddressDoctor from "./MedicalAddressDoctor";

class BookingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailDoctor: {},
    };
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  handleConfirm = () => {

  }

  handleCancelOrClose = () => {
    this.props.handleCloseModal();
  }

  render() {
    let isOpenModal = this.props.isOpenModal
    return (
            <Modal 
                isOpen={isOpenModal} 
                className="booking-modal-container"
                size="lg"
                centered
            >
              <div className="booking-modal-content">

                <div className="booking-modal-header">
                    <span className="left">Thông tin đặt lịch khám bệnh</span>
                    <span 
                        className="right"
                        onClick={() => this.handleCancelOrClose()}
                    ><i className="fas fa-times"></i></span>
                </div>

                <div className="booking-modal-body">
                  <div className="doctor-info">
                    <div className="left"></div>
                    <div className="right">
                      <div>Đặt lịch khám</div>
                      <div>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị Hoài An</div>
                      <div>07:30 - 08:30 - Thứ 3 - 07/03/2023</div>
                    </div>
                  </div>
                  <span>Giá khám: </span><span>500.000đ</span>
                  <div className="row">
                    <div className="form-group col-4">
                      <label>Họ và tên</label>
                      <input className="form-control" placeholder="Bắt buộc" />
                    </div>
                    <div className="form-group col-4">
                      <label>Email</label>
                      <input className="form-control" placeholder="Bắt buộc" />
                    </div>
                    <div className="form-group col-4">
                      <label>Số điện thoại</label>
                      <input className="form-control" placeholder="Bắt buộc" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-4">
                      <label>Ngày tháng năm sinh</label>
                      <input className="form-control" placeholder="Ngày/Tháng/Năm" />
                    </div>
                    <div className="form-group col-8">
                      <label>Địa chỉ</label>
                      <input className="form-control" placeholder="Bắt buộc" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Lý do khám</label>
                    <textarea rows="3" className="form-control" placeholder="Bắt buộc" />
                  </div>
                </div>

                <div className="booking-modal-footer">
                  <button 
                      className="btn btn-secondary btn-confirm"
                      onClick={() => this.handleCancelOrClose()}
                  >
                    Hủy bỏ
                  </button>
                  <button 
                      className="btn btn-primary btn-cancel"
                      onClick={() => this.handleConfirm()}
                  >
                    Xác nhận
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
