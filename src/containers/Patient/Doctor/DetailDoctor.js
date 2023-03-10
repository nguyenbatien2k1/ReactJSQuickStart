import React, { Component } from "react";
import { connect } from "react-redux";

import "./DetailDoctor.scss";

import HomeHeader from "../../HomePage/HomeHeader";
import { userService } from "../../../services";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import MedicalAddressDoctor from "./MedicalAddressDoctor";
import { withRouter } from "react-router";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailDoctor: {}
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.doctorId) {
      let doctorId = this.props.match.params.doctorId;
      
      let res = await userService.getDetailDoctor(doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="detail-doctor-container">
          <div className="container">
            <div className="intro-doctor my-3">
              <div
                className="content-left"
                style={{
                  backgroundImage: `url(${
                    detailDoctor.image ? detailDoctor.image : ""
                  })`,
                }}
              ></div>
              <div className="content-right">
                <div className="up mb-3">
                  {language === LANGUAGES.VI ? nameVi : nameEn}
                </div>
                <div className="down">
                  {detailDoctor &&
                    detailDoctor.Markdown &&
                    detailDoctor.Markdown.description && (
                      <span>{detailDoctor.Markdown.description}</span>
                    )}
                </div>
              </div>
            </div>
            <div className="schedule-doctor">
              <div className="content-left">
                <DoctorSchedule 
                  priceData={detailDoctor && detailDoctor.Doctor_Info && detailDoctor.Doctor_Info.priceData}
                  doctorId={this.props.match.params.doctorId}
                />
              </div>
              <div className="content-right">
                <MedicalAddressDoctor
                  doctorId={this.props.match.params.doctorId} 
                  priceData={detailDoctor && detailDoctor.Doctor_Info && detailDoctor.Doctor_Info.priceData}
                />
              </div>
            </div>
            <div className="detail-info-doctor my-3">
              {detailDoctor &&
                detailDoctor.Markdown &&
                detailDoctor.Markdown.contentHTML && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detailDoctor.Markdown.contentHTML,
                    }}
                  ></div>
                )}
            </div>
            <div className="comment-doctor"></div>
          </div>
        </div>
      </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailDoctor));
