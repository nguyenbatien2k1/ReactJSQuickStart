import React, { Component } from "react";
import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import Select from "react-select";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { userService } from "../../../services";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // save to table markdown
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedDoctor: "",
      doctors: [],
      hasOldData: false,
      action: '',

      // save to table doctor_info
      prices: [],
      selectedPrice: "",

      payments: [],
      selectedPayment: "",

      provinces: [],
      selectedProvince: "",

      nameClinic: '',
      addressClinic: '',
      note: '',

      allRequiredDoctor: []

    };
  }

  componentDidMount() {
    this.props.getAllDoctors();
    this.props.getAllRequiredDoctorInfo();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
      let dataDoctorSelect = this.buildDataInputSelect(this.props.doctorsRedux, 'DOCTOR');
      this.setState({
        doctors: dataDoctorSelect,
        prices: this.buildDataInputSelect(this.props.allRequiredDoctor.resPrice),
        payments: this.buildDataInputSelect(this.props.allRequiredDoctor.resPayment),
        provinces: this.buildDataInputSelect(this.props.allRequiredDoctor.resProvince),
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataDoctorSelect = this.buildDataInputSelect(this.props.doctorsRedux, 'DOCTOR');
      this.setState({
        doctors: dataDoctorSelect,
        prices: this.buildDataInputSelect(this.props.allRequiredDoctor.resPrice, 'PRICE'),
        payments: this.buildDataInputSelect(this.props.allRequiredDoctor.resPayment),
        provinces: this.buildDataInputSelect(this.props.allRequiredDoctor.resProvince),
        selectedDoctor: '',
        selectedPrice: '',
        selectedPayment: '',
        selectedProvince: '',
        contentMarkdown: "",
        contentHTML: "",
        description: ''
      });
    }

    if(prevProps.allRequiredDoctor !== this.props.allRequiredDoctor) {
      this.setState({
        allRequiredDoctor: this.props.allRequiredDoctor,
        prices: this.buildDataInputSelect(this.props.allRequiredDoctor.resPrice, 'PRICE'),
        payments: this.buildDataInputSelect(this.props.allRequiredDoctor.resPayment),
        provinces: this.buildDataInputSelect(this.props.allRequiredDoctor.resProvince),
      })
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleChangeDoctor = async (selectedDoctor) => {
    this.setState({ 
        selectedDoctor,
    });
    let {prices, payments, provinces} = this.state;

    let res = await userService.getDetailDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown && res.data.Doctor_Info) {
      let markdown = res.data.Markdown;

      let priceId = '',
          paymentId = '',
          provinceId = '',
          nameClinic = '',
          addressClinic = '',
          note = '';
      let selectedPrice = '',
          selectedPayment = '',
          selectedProvince = ''
      
      if(res.data.Doctor_Info) {
        nameClinic = res.data.Doctor_Info.nameClinic;
        addressClinic = res.data.Doctor_Info.addressClinic;
        note = res.data.Doctor_Info.note;

        priceId = res.data.Doctor_Info.priceId;
        paymentId = res.data.Doctor_Info.paymentId;
        provinceId = res.data.Doctor_Info.provinceId;

        selectedPrice = prices.find(item => item.value === priceId);
        selectedPayment = payments.find(item => item.value === paymentId);
        selectedProvince = provinces.find(item => item.value === provinceId);

      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        action: CRUD_ACTIONS.EDIT,
        
        //
        selectedPrice,
        selectedPayment,
        selectedProvince,
        nameClinic,
        addressClinic,
        note
      });
    }
    
    else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        hasOldData: false,
        action: CRUD_ACTIONS.CREATE,
        selectedPrice: '',
        selectedPayment: '',
        selectedProvince: '',
        nameClinic: '',
        addressClinic: '',
        note: ''
      });
    }
  };

  handleChangeSelectDoctorInfo = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = {
      ...this.state
    }

    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy
    })
  }

  handleSaveContent = () => {
    this.props.createInfoDoctor({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: this.state.action,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note

    });
  };

  handleOnChangeText = (e, id) => {
    
    let stateCopy = {...this.state};
    stateCopy[id] = e.target.value

    this.setState({
      ...stateCopy
    });
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if(type === 'DOCTOR') {
        result = inputData.map((item, index) => {
          let object = {};
          let labelVi = type === 'DOCTOR' ? `${item.lastName} ${item.firstName}`: item.valueVi
          let labelEn = type === 'DOCTOR' ? `${item.firstName} ${item.lastName}` : item.valueEn;
  
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
  
          return object;
        });
      }
      else if(type === 'PRICE') {
        result = inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi} VNĐ`
          let labelEn = `${item.valueEn} USD`;
  
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.key;
  
          return object;
        });
      }
      else {
        result = inputData.map((item, index) => {
          let object = {};
          let labelVi = item.valueVi
          let labelEn = item.valueEn;
  
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.key;
  
          return object;
        });
      }
    }
    return result;
  };

  render() {
    const { 
        selectedDoctor, 
        doctors, 
        hasOldData, 
        allRequiredDoctor, 
        prices, 
        selectedPrice, 
        payments, 
        selectedPayment, 
        provinces, 
        selectedProvince 
      } = this.state;

    return (
      <div className="manage-doctor-container container my-3">
        <div className="text-center title mb-3"><FormattedMessage id="manage-doctor.title" /></div>
        <div className="more-info my-3">
          <div className="row">
            <div className="content-left col-3">
              <label>
                <FormattedMessage id="manage-doctor.choose-doctor" />
              </label>
              <Select
                value={selectedDoctor}
                options={doctors}
                onChange={this.handleChangeDoctor}
                placeholder={<FormattedMessage id="manage-doctor.choose-doctor" />}
              />
            </div>
            <div className="content-right col-9">
              <label>
                <FormattedMessage id="manage-doctor.introduction-info" />
              </label>
              <textarea
                className="form-control"
                value={this.state.description}
                onChange={(e) => this.handleOnChangeText(e, 'description')}
              ></textarea>
            </div>
          </div>
          <div className="row my-3">
            <div className="form-group col-3">
                <label><FormattedMessage id="manage-doctor.choose-price" /></label>
                <Select
                name={"selectedPrice"}
                value={selectedPrice}
                options={prices}
                onChange={this.handleChangeSelectDoctorInfo}
                placeholder={<FormattedMessage id="manage-doctor.choose-price" />}
                />
            </div>

            <div className="form-group col-3">
                <label><FormattedMessage id="manage-doctor.choose-payment" /></label>
                <Select
                name={"selectedPayment"}
                value={selectedPayment}
                options={payments}
                onChange={this.handleChangeSelectDoctorInfo}
                placeholder={<FormattedMessage id="manage-doctor.choose-payment" />}
              />
            </div>

            <div className="form-group col-3">
                <label><FormattedMessage id="manage-doctor.choose-name-clinic" /></label>
                <textarea 
                  className="form-control" 
                  value={this.state.nameClinic} 
                  onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}
                  />
            </div>

            <div className="form-group col-3">
                <label><FormattedMessage id="manage-doctor.choose-address-clinic" /></label>
                <textarea 
                  className="form-control"
                  value={this.state.addressClinic} 
                  onChange={(e) => this.handleOnChangeText(e, 'addressClinic')}
                  />
            </div>

            <div className="form-group col-4">
                <label><FormattedMessage id="manage-doctor.choose-province" /></label>
                <Select
                name={"selectedProvince"}
                value={selectedProvince}
                options={provinces}
                onChange={this.handleChangeSelectDoctorInfo}
                placeholder={<FormattedMessage id="manage-doctor.choose-province" />}
              />
            </div>

            <div className="form-group col-5">
                <label><FormattedMessage id="manage-doctor.note" /></label>
                <textarea 
                  className="form-control"
                  value={this.state.note} 
                  onChange={(e) => this.handleOnChangeText(e, 'note')}
                  ></textarea>
            </div>
          </div>
        </div>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.state.contentMarkdown}
        />
        <button
          type="button"
          className={hasOldData ? "btn btn-warning my-3" : 'btn btn-primary my-3' }
          onClick={() => this.handleSaveContent()}
        >
          {
            hasOldData ? <FormattedMessage id="manage-doctor.save" /> : <FormattedMessage id="manage-doctor.create" />
          }
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctorsRedux: state.admin.doctors,
    allRequiredDoctor: state.admin.allRequiredDoctor
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.getAllDoctorsStart()),
    getAllRequiredDoctorInfo: () => dispatch(actions.getAllRequiredDoctorInfoStart()),
    createInfoDoctor: (data) => dispatch(actions.createInfoDoctorStart(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
