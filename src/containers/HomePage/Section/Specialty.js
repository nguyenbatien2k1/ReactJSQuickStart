import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Specialty.scss';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { userService } from '../../../services';
import { LANGUAGES } from '../../../utils';

import { withRouter } from 'react-router-dom';

class Specialty extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            dataSpecialty : [],
        }
    }
    

    async componentDidMount() {
        let res = await userService.getAllSpecialty();

        if(res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleDetailSpecialty = (item) => {
        // console.log(item)
        this.props.history.push(`/detail-specialty/${item.id}`)
    }

    render() {

        const {dataSpecialty} = this.state; 

        return (
            <div className='section-specialty section-share'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'><FormattedMessage id="home-page.popular-specialty" /></span>
                        <button className='section-btn-see-more'><FormattedMessage id="home-page.see-more" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='img-custom' 
                                                key={index}
                                                onClick={() => this.handleDetailSpecialty(item)}
                                            >
                                                <div className='bg-image'
                                                    style={{backgroundImage: `url(${item.image})`}}
                                                ></div>
                                                <div>{this.props.language === LANGUAGES.VI ? item.nameVi : item.nameEn}</div>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
