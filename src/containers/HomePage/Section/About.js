import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {

    render() {

        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>Truyền thông nói gì về chúng tôi ?</div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="320px" src="https://www.youtube.com/embed/I0KUKXGDxuU" title="tích phân 4 ẩn dạng phân số" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Nguyễn Bá Tiên</p>
                        <p>SĐT: 0384445041</p>
                        <p>Email: nguyenbatien2k1@gmail.com</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
