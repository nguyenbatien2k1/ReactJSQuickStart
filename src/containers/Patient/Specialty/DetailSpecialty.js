import React, { Component } from 'react';
import { connect } from "react-redux";

import './DetailSpecialty.scss';
import {FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { userService } from '../../../services';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
         
        }
    }

    async componentDidMount() {
       
    }

   
    async componentDidUpdate(prevProps, prevState, snapshot) {
       if(prevProps.language !== this.props.language) {
        this.getDataFromAPI();
       }
    }


    render() {

        return (
           <div>Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
