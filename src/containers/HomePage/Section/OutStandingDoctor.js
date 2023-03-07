import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            outstandingdoctors: []
        }
    }
    

    componentDidMount() {
        this.props.loadOutStandingDoctor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.outstandingdoctors !== this.props.outstandingdoctors) {
            this.setState({
                outstandingdoctors: this.props.outstandingdoctors
            })
        }
    }

    handleDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {

        let {outstandingdoctors} = this.state;
        let language = this.props.language

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'><FormattedMessage id="home-page.outstanding-doctor"/></span>
                        <button className='section-btn-see-more'><FormattedMessage id="home-page.see-more"/></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                outstandingdoctors && outstandingdoctors.length > 0 &&
                                outstandingdoctors.map((item, index) => {
                                    let imageBase64 = '';
                                    if(item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div className='border-custom' key={index} onClick = {() => this.handleDetailDoctor(item)}>
                                            <div className='img-custom'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                         style={{backgroundImage: `url(${imageBase64})`}}
                                                    >
                                                    </div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>Cơ xương khớp</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        outstandingdoctors: state.admin.outstandingdoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadOutStandingDoctor: () => dispatch(actions.loadOutStandingDoctorStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
