import React, { Component } from "react";
import { connect } from "react-redux";

import "./ProfileDoctor.scss";

import { LANGUAGES } from "../../../utils";
import { userService } from '../../../services';
import { FormattedMessage } from "react-intl";
import moment from "moment";
import localization from "moment/locale/vi";
import { Link } from "react-router-dom";



class ProfileDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: {},
        dataProfileDoctor: {}
    };
  }

  async componentDidMount() {
      let res = await this.getDataProfileDoctor(this.props.doctorId);

      this.setState({
        data: {
          dataProfileDoctor: res,
          dataScheduleTime: this.props.dataScheduleTime
        }
      })
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
      if(prevProps.language !== this.props.language) {
        let data = this.getDataProfileDoctor(this.props.doctorId);
        this.setState({
          dataProfileDoctor: data
        })
      }

      if(prevProps.doctorId !== this.props.doctorId) {
        let res = await this.getDataProfileDoctor(this.props.doctorId);
        this.setState({
          data: {
            dataProfileDoctor: res,
            dataScheduleTime: this.props.dataScheduleTime
          }
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

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

  render() {

      let {dataProfileDoctor, dataScheduleTime} = this.state.data;
      let {language, isShowSeeMore, doctorId} = this.props;
      let nameDoctorVi ='', nameDoctorEn='';
      let nameClinic = '', addressClinic = '', priceVi = '', priceEn = '';

      if(dataProfileDoctor && dataProfileDoctor.positionData) {
          nameDoctorVi = `${dataProfileDoctor.positionData.valueVi}, ${dataProfileDoctor.lastName} ${dataProfileDoctor.firstName}`
          nameDoctorEn = `${dataProfileDoctor.positionData.valueEn}, ${dataProfileDoctor.firstName} ${dataProfileDoctor.lastName}`
          if(nameDoctorEn === 'None') {
            nameDoctorEn = 'Doctor'
          }
      }

      if(dataProfileDoctor && dataProfileDoctor.Doctor_Info && dataProfileDoctor.Doctor_Info.priceData) {
        nameClinic = dataProfileDoctor.Doctor_Info.nameClinic;
        addressClinic = dataProfileDoctor.Doctor_Info.addressClinic;
        priceVi = `${dataProfileDoctor.Doctor_Info.priceData.valueVi}`;
        priceEn = `${dataProfileDoctor.Doctor_Info.priceData.valueEn}`;
      }

      return (
        <div className="doctor-info-container">
              <div className="left">
                <div className="l-img" style={{backgroundImage: `url(${dataProfileDoctor && dataProfileDoctor.image ? dataProfileDoctor.image : ''})`,
                          backgroundPosition: 'center center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}
                ></div>
                {
                  isShowSeeMore ?
                  <Link to={`/detail-doctor/${doctorId}`} className="see-more"><FormattedMessage id="home-page.see-more" /></Link> : ''
                }
              </div>
              <div className="right">
                  <div className="booking"><FormattedMessage id="patient.modal.booking" /></div>
                  <div className="name-doctor">
                    {
                        language === LANGUAGES.VI ? nameDoctorVi : nameDoctorEn
                    }
                  </div>
                  <div className="nameClinic">{nameClinic ? nameClinic : ''}</div>
                  <div className="addressClinic">{addressClinic ? addressClinic : ''}</div>
              </div>
        </div>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
