import React, { Component } from 'react';
import { connect } from "react-redux";

import './MedicalAddressDoctor.scss';
import {FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

class MedicalAddressDoctor extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
          isShowDetail: false
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    handleShowHide = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail
        })
    }

    render() {

        const {isShowDetail} = this.state;

        return (
           <div className='medical-address-container'>
                <div className='content-up'>
                    <div className='text-title mb-2'>Địa chỉ khám</div>
                    <div className='text-clinic'>Phòng khám đa khoa</div>
                    <div className='text-address'>Ngách 63 Trần Quốc Vượng</div>
                </div>
                <div className='content-down'>
                    {
                        isShowDetail === false ?
                        <div>
                            <span className='text-title'>Giá khám: </span>
                            <span style={{fontSize: '16px'}}>300.000đ. </span>
                            <span className='see-detail' onClick={(e) => this.handleShowHide(e)}>Xem chi tiết</span>
                        </div> :
                        <>
                            <div className='text-title'>Giá khám</div>
                            <div className='c-d-table my-3'>
                                <div>
                                    <div className='text-price mb-1'>
                                        <span>Giá khám</span>
                                        <span>300.000đ</span>
                                    </div>
                                    <div className='text-note'>Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD.</div>
                                </div>
                                <div className='text-payment mt-1'>Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</div>
                            </div>
                                <span
                                    className='hide-price-list'
                                    onClick={(e) => this.handleShowHide(e)}
                                >Thu gọn</span>
                        </>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalAddressDoctor));
