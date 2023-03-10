import React, { Component } from "react";
import { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { userService } from "../../../services";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {

      allRequiredDoctor: [],

      // save to table markdown
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      selectedDoctor: "",
      doctors: [],
      hasOldData: false,
      action: '',

      // save to table doctor_info
      listPrice: [],
      selectedPrice: "",

      listPayment: [],
      selectedPayment: "",

      listProvince: [],
      selectedProvince: "",

      nameClinic: '',
      addressClinic: '',
      note: '',

      //
      listSpecialty: [],
      listClinic: [],
      selectedSpecialty: '',
      selectedClinic: '',
      specialtyId: '',
      clinicId: '',

    };
  }

  componentDidMount() {
    this.props.getAllDoctors();
    this.props.getAllRequiredDoctorInfo();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorsRedux !== this.props.doctorsRedux) {
      let dataDoctorSelect = this.buildDataInputSelect(this.props.doctorsRedux, 'DOCTOR');
      let {resPayment, resPrice, resProvince, resSpecialty} = this.props.allRequiredDoctor;
      this.setState({
        doctors: dataDoctorSelect,
        listPrice: this.buildDataInputSelect(resPrice, 'PRICE'),
        listPayment: this.buildDataInputSelect(resPayment, 'PAYMENT'),
        listProvince: this.buildDataInputSelect(resProvince, 'PROVINCE'),
        listSpecialty: this.buildDataInputSelect(resSpecialty, 'SPECIALTY'),
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataDoctorSelect = this.buildDataInputSelect(this.props.doctorsRedux, 'DOCTOR');
      let {resPayment, resPrice, resProvince, resSpecialty} = this.props.allRequiredDoctor;
      this.setState({
        doctors: dataDoctorSelect,
        listPrice: this.buildDataInputSelect(resPrice, 'PRICE'),
        listPayment: this.buildDataInputSelect(resPayment, 'PAYMENT'),
        listProvince: this.buildDataInputSelect(resProvince, 'PROVINCE'),
        listSpecialty: this.buildDataInputSelect(resSpecialty, 'SPECIALTY'),
        selectedDoctor: '',
        selectedPrice: '',
        selectedPayment: '',
        selectedProvince: '',
        contentMarkdown: "",
        contentHTML: "",
        description: '',
        nameClinic: '',
        addressClinic: '',
        note: ''
      });
    }

    if(prevProps.allRequiredDoctor !== this.props.allRequiredDoctor) {
      let {resPayment, resPrice, resProvince, resSpecialty} = this.props.allRequiredDoctor;
      this.setState({
        allRequiredDoctor: this.props.allRequiredDoctor,
        listPrice: this.buildDataInputSelect(resPrice, 'PRICE'),
        listPayment: this.buildDataInputSelect(resPayment, 'PAYMENT'),
        listProvince: this.buildDataInputSelect(resProvince, 'PROVINCE'),
        listSpecialty: this.buildDataInputSelect(resSpecialty, 'SPECIALTY'),
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
    let {listPrice, listPayment, listProvince, listSpecialty} = this.state;

    let res = await userService.getDetailDoctor(selectedDoctor.value);

    if (res && res.errCode === 0 && res.data) {

      let priceId = '',
          paymentId = '',
          provinceId = '',
          nameClinic = '',
          addressClinic = '',
          specialtyId = '',
          note = '';
      let selectedPrice = '',
          selectedPayment = '',
          selectedProvince = '',
          selectedSpecialty= '';
      
      if(res.data.Doctor_Info) {
        nameClinic = res.data.Doctor_Info.nameClinic;
        addressClinic = res.data.Doctor_Info.addressClinic;
        note = res.data.Doctor_Info.note;

        priceId = res.data.Doctor_Info.priceId;
        paymentId = res.data.Doctor_Info.paymentId;
        provinceId = res.data.Doctor_Info.provinceId;
        specialtyId = res.data.Doctor_Info.specialtyId;

        selectedPrice = listPrice.find(item => item.value === priceId);
        selectedPayment = listPayment.find(item => item.value === paymentId);
        selectedProvince = listProvince.find(item => item.value === provinceId);

        selectedSpecialty = listSpecialty.find(item => item.value === specialtyId)
        this.setState({
          // contentHTML: markdown ? markdown.contentHTML : '',
          // contentMarkdown: markdown ? markdown.contentMarkdown : '',
          // description: markdown ? markdown.description : '',
          hasOldData: true,
          action: CRUD_ACTIONS.EDIT,
          
          //
          selectedPrice,
          selectedPayment,
          selectedProvince,
          nameClinic,
          addressClinic,
          note,
          selectedSpecialty,
  
          //
        });
      }
      if(res.data.Markdown) {
        let markdown = res.data.Markdown;
        this.setState({
        contentHTML: markdown ? markdown.contentHTML : '',
        contentMarkdown: markdown ? markdown.contentMarkdown : '',
        description: markdown ? markdown.description : '',
      })
      }

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
        note: '',
        selectedDoctor: '',
        selectedSpecialty: ''
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

  handleSaveInfo = () => {

    // console.log(this.state)

    // return ;

    this.props.createInfoDoctor({
      doctorId: this.state.selectedDoctor.value,
      description: this.state.description,
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      action: this.state.action,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      
      specialtyId: this.state.selectedSpecialty.value,
      clinicId: this.state.selectedClinic ? this.state.selectedClinic.value : 1,
      note: this.state.note,

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
      else if(type === 'PAYMENT' || type === 'PROVINCE') {
        result = inputData.map((item, index) => {
          let object = {};
          let labelVi = item.valueVi
          let labelEn = item.valueEn;
  
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.key;
  
          return object;
        });
      }
      else if(type === 'SPECIALTY') {
        result = inputData.map((item, index) => {
          let object = {};
          let labelVi = item.nameVi
          let labelEn = item.nameEn;
  
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
  
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
        listPrice, 
        selectedPrice, 
        listPayment, 
        selectedPayment, 
        listProvince, 
        selectedProvince,
        listSpecialty,
        selectedSpecialty 
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
            <div className="col-9">
              <div className="row">
                <div className="col-6">
                    <label>
                      <FormattedMessage id="manage-doctor.choose-specialty" />
                    </label>
                    <Select
                      name="selectedSpecialty"
                      value={selectedSpecialty}
                      options={listSpecialty}
                      onChange={this.handleChangeSelectDoctorInfo}
                      placeholder={<FormattedMessage id="manage-doctor.choose-specialty" />}
                    />
                </div>
                <div className="col-6">
                    <label>
                      <FormattedMessage id="manage-doctor.choose-clinic" />
                    </label>
                    <Select
                      name="selectedClinic"
                      value={this.state.selectedClinic}
                      options={this.state.listClinic}
                      onChange={this.handleChangeSelectDoctorInfo}
                      placeholder={<FormattedMessage id="manage-doctor.choose-clinic" />}
                    />
                </div>
              </div>
            </div>
            {/* <div className="content-right col-9">
              <label>
                <FormattedMessage id="manage-doctor.introduction-info" />
              </label>
              <textarea
                className="form-control"
                value={this.state.description}
                onChange={(e) => this.handleOnChangeText(e, 'description')}
              ></textarea>
            </div> */}
          </div>
          <div className="my-3">
            <label>
                <FormattedMessage id="manage-doctor.introduction-info" />
              </label>
              <textarea
                className="form-control"
                value={this.state.description}
                onChange={(e) => this.handleOnChangeText(e, 'description')}
              ></textarea>
          </div>
          <div className="row my-3">
            <div className="form-group col-3">
                <label><FormattedMessage id="manage-doctor.choose-price" /></label>
                <Select
                name={"selectedPrice"}
                value={selectedPrice}
                options={listPrice}
                onChange={this.handleChangeSelectDoctorInfo}
                placeholder={<FormattedMessage id="manage-doctor.choose-price" />}
                />
            </div>

            <div className="form-group col-3">
                <label><FormattedMessage id="manage-doctor.choose-payment" /></label>
                <Select
                name={"selectedPayment"}
                value={selectedPayment}
                options={listPayment}
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
                options={listProvince}
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
          style={{ height: "300px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.state.contentMarkdown}
        />
        <button
          type="button"
          className={hasOldData ? "btn btn-warning my-3" : 'btn btn-primary my-3' }
          onClick={() => this.handleSaveInfo()}
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
