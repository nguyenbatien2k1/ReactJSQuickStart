import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './MedicalFacility.scss'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { userService } from '../../../services';
import { withRouter } from 'react-router-dom';

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            dataClinics: []
        }

    }

    async componentDidMount() {
        let res = await userService.getAllClinic();

        if(res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data
            })
        }
    }    

    handleOnClickMedicalFacility = () => {
        // let clinicId = this.props
        console.log('abc')
    }

    render() {

        let {dataClinics} = this.state;

        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'>Cơ sở y tế nổi bật</span>
                        <button className='section-btn-see-more'>Tìm kiếm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                dataClinics && dataClinics.length > 0 &&
                                dataClinics.map((item, index) => {
                                    return (
                                        <Link 
                                            key={index}
                                            className='img-custom'
                                            to={`/detail-clinic/${item.id}`}
                                        >
                                            <div 
                                                className='bg-image section-medical-facility'
                                                style={{backgroundImage: `url(${item.image})`}}
                                            ></div>
                                            <div className='mt-2'>{item.name}</div>
                                        </Link>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
