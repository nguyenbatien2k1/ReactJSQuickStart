import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'

class HomeHeader extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <b>Chuyên khoa</b>
                                <div className='subs-title'>Tìm theo bác sĩ chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <b>Cơ sở y tế</b>
                                <div className='subs-title'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <b>Bác sĩ</b>
                                <div className='subs-title'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <b>Gói khám</b>
                                <div className='subs-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle">Hỗ trợ</i></div>
                            <div className='flag'>Việt Nam</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>NỀN TẢNG Y TẾ</div>
                        <div className='title2'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'>Khám chuyên khoa</div>
                            </div>

                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile"></i></div>
                                <div className='text-child'>Khám từ xa</div>
                            </div>

                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-notes-medical"></i></div>
                                <div className='text-child'>Khám tổng quát</div>
                            </div>

                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-vial"></i></div>
                                <div className='text-child'>Xét nghiệm y học</div>
                            </div>

                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-heartbeat"></i></div>
                                <div className='text-child'>Sức khỏe tinh thần</div>
                            </div>

                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-user-md"></i></div>
                                <div className='text-child'>Khám nha khoa</div>
                            </div>

                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-user-md"></i></div>
                                <div className='text-child'>Gói phẫu thuật</div>
                            </div>

                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-user-md"></i></div>
                                <div className='text-child'>Sản phẩm y tế</div>
                            </div>

                            <div className='option-child'>
                                <div className='icon-child'><i class="fas fa-user-md"></i></div>
                                <div className='text-child'>Sức khỏe doanh nghiệp</div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
