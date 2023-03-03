import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';

import './HomePage.scss'; 

import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    handleAfterChange = () => {

    }

    render() {

        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            afterChange: this.handleAfterChange
        };

        return (
            <React.Fragment>
                <HomeHeader />
                <Specialty 
                    settings = {settings} 
                />
                <MedicalFacility
                    settings = {settings} 
                />
                <OutStandingDoctor
                    settings = {settings} 
                />
                <HandBook
                    settings = {settings} 
                />
                <About />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
