import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeHeader.scss";

import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    let language = this.props.language;

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <Link className="header-logo" to={"/home"}></Link>
            </div>
            <div className="center-content">
              <div className="child-content">
                <b>
                  <FormattedMessage id="homeheader.specialty" />
                </b>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.search-doctor" />
                </div>
              </div>
              <div className="child-content">
                <b>
                  <FormattedMessage id="homeheader.health-facility" />
                </b>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.health-facility" />
                </div>
              </div>
              <div className="child-content">
                <b>
                  <FormattedMessage id="homeheader.doctor" />
                </b>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.choose-good-doctor" />
                </div>
              </div>
              <div className="child-content">
                <b>
                  <FormattedMessage id="homeheader.examination-package" />
                </b>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.general-health-check" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <span>
                  <FormattedMessage id="homeheader.support" />
                </span>
              </div>
              <div className="flag">
                <div
                  className={
                    language === LANGUAGES.VI
                      ? "language-vi active"
                      : "language-vi"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                    VN
                  </span>
                </div>
                <div
                  className={
                    language === LANGUAGES.EN
                      ? "language-en active"
                      : "language-vi"
                  }
                >
                  <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                    EN
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-notes-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.specialistexamination" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.remoteexamination" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-heartbeat"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.generalexamination" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-vial"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.medicaltest" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.mentalhealth" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.dentalexamination" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.surgerypack" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.medicalproducts" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.businesshealth" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
