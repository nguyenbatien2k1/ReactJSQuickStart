import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { userService } from '../../../services';

class HandBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listHandbook: []
        }
    }

    async componentDidMount() {
        let res = await userService.getAllHandbook();
        if(res && res.errCode === 0) {
            this.setState({
                listHandbook : res.data
            })
        }
    }

    render() {

        let {listHandbook} = this.state;
        if(listHandbook.length < 4) listHandbook = [...listHandbook, ...listHandbook, ...listHandbook];

        return (
            <div className='section-handbook section-share'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-title'>Cẩm nang</span>
                        <button className='section-btn-see-more'>Tất cả bài viết</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                listHandbook && listHandbook.length > 0 && 
                                listHandbook.map((item, index) => {
                                    return (
                                        <Link className='img-custom' key={index} to={`/detail-handbook/${item.id}`}>
                                            <div 
                                                className='bg-image section-handbook'
                                                style={{backgroundImage: `url(${item.image})`}}
                                            ></div>
                                            <div className='mt-1'>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
