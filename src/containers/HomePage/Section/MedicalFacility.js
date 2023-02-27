import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './MedicalFacility.scss'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {

    render() {

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'>Cơ sở y tế nổi bật</span>
                        <button className='section-btn-see-more'>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-custom'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Cơ sở y tế Xu Ti 1</div>
                            </div>
                            <div className='img-custom'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Cơ sở y tế Xu Ti 2</div>
                            </div>
                            <div className='img-custom'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Cơ sở y tế Xu Ti 3</div>
                            </div>
                            <div className='img-custom'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Cơ sở y tế Xu Ti 4</div>
                            </div>
                            <div className='img-custom'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Cơ sở y tế Xu Ti 5</div>
                            </div>
                            <div className='img-custom'>
                                <div className='bg-image section-medical-facility'></div>
                                <div>Cơ sở y tế Xu Ti 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
