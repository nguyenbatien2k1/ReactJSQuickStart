import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutStandingDoctor extends Component {

    render() {

        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'>Bác sĩ nổi bật tuần qua</span>
                        <button className='section-btn-see-more'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='border-custom'>
                                <div className='img-custom'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor'></div>
                                    </div>
                                    <div className='position text-center'>
                                        <div>Giáo sư, Tiến sĩ Tiên Basic</div>
                                        <div>Cơ xương khớp</div>
                                    </div>
                                </div>
                            </div>

                            <div className='border-custom'>
                            <div className='img-custom'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-outstanding-doctor'></div>
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ Tiên Basic</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
                            </div>

                            <div className='border-custom'>
                            <div className='img-custom'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-outstanding-doctor'></div>
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ Tiên Basic</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
                            </div>
                                
                            <div className='border-custom'>
                            <div className='img-custom'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-outstanding-doctor'></div>
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ Tiên Basic</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
                            </div>
                                
                            <div className='border-custom'>
                            <div className='img-custom'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-outstanding-doctor'></div>
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ Tiên Basic</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
                            </div>
                                
                            <div className='border-custom'>
                            <div className='img-custom'>
                                <div className='outer-bg'>
                                    <div className='bg-image section-outstanding-doctor'></div>
                                </div>
                                <div className='position text-center'>
                                    <div>Giáo sư, Tiến sĩ Tiên Basic</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
