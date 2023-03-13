
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


import { CommonUtils, LANGUAGES } from "../../../utils";
// import ProfileDoctor from "./ProfileDoctor";

import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { userService } from "../../../services";

import DatePicker from '../../../components/Input/DatePicker';
import * as actions from '../../../store/actions';
import Select from "react-select";
import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi";
import _ from "lodash";



class RemedyModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        imgBase64: '',
        tailFile: ''
    };
  }

  async componentDidMount() {
    if(this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email
      })
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.language !== this.props.language) {
      
    }

    if(prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email
      })
    }
  }

  handleCancelOrClose = () => {
    this.props.handleCloseModal();
  }

  handleChangeImage = async (e) => {
    let file = e.target.files[0];
    if(file) {
        let base64 = await CommonUtils.getBase64(file);
        this.setState({
          email: this.state.email,
          imgBase64: base64,
          tailFile: file.name.split('.')[1]
        })
    }
  } 

  handleChangeInput = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleConfirmModal = () => {
    this.props.sendRemedy(this.state);
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

  render() {
    let {isOpen, dataModal} = this.props;

    return (
            <Modal 
                isOpen={isOpen} 
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

                  <ModalBody>
                      <div className="row">
                        <div className="form-group col-6">
                          <label>Email</label>
                          <input 
                              value={this.state.email} 
                              className="form-control"
                              onChange={(e) => this.handleChangeInput(e)}
                          
                          ></input>
                        </div>
                        <div className="form-group col-6">
                          <label>Chọn file đơn thuốc</label>
                          <input type="file" className="form-control-file"
                                  onChange={(e) => this.handleChangeImage(e)}
                          ></input>
                        </div>
                      </div>
                  </ModalBody>

                  <div className="booking-modal-footer">
                    <button 
                        className="btn btn-secondary btn-confirm"
                        onClick={() => this.handleCancelOrClose()}
                    >
                      <FormattedMessage id="patient.modal.cancel" />
                    </button>
                    <button 
                        className="btn btn-primary btn-cancel"
                        onClick={() => this.handleConfirmModal()}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RemedyModal));
